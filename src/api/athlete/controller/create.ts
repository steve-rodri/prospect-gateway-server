import { Athlete, PrismaClient } from "@prisma/client";
import axios from "axios";

import { athleteSearchSchema, AthleteSearchSchema } from "../validators";
import { ControllerMethod } from "../../types";
import { HttpError } from "../../utils";

const prisma = new PrismaClient();

const NBA_API_BASE = process.env.NBA_API_BASE;

type Create = ControllerMethod<Athlete, { data: AthleteSearchSchema }>;

export const create: Create = async ({ data }) => {
  const validationResult = athleteSearchSchema.safeParse(data);
  if (!validationResult.success) {
    throw new HttpError(400, validationResult.error.message);
  }

  const { firstName, lastName, suffix } = validationResult.data;

  const athleteData = await axios.get(
    `${NBA_API_BASE}/athleteid?first=${firstName}&last=${lastName}&suffix=${suffix}`
  );

  const found = await prisma.athlete.findFirst({
    where: { id: athleteData.data.id },
  });

  if (found) {
    return found;
    // TODO: use last updated to determine if should fetch from nba_api and update data
    // const getLastUpdatedQuery = dbc('athletes').select('last_updated').where('id', '=', athleteId);
    // const lastUpdated = await getLastUpdatedQuery;
    // if lastUpdated was 24+hrs ago, re-fetch
  }

  // athlete is not currently in the database
  if (!found) {
    const profile = await axios.get(
      `${NBA_API_BASE}/profile?first=${firstName}&last=${lastName}&suffix=${suffix}`
    );

    const { career_averages, ...profileData } = profile.data;

    return prisma.athlete.create({
      data: {
        ...profileData,
        ...career_averages,
      },
    });
  }
};