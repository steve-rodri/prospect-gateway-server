import { Athlete, PrismaClient } from "@prisma/client";
import { create } from "./create";

import { athleteCreateSchema, AthleteCreateSchema } from "../validators";
import { ControllerMethod } from "../../types";
import { HttpError } from "../../utils";

const prisma = new PrismaClient();

// set the hour limit until data is considered stale
const HOURS_TO_STALE = 24;

type FindOrCreate = ControllerMethod<Athlete, { data: AthleteCreateSchema }>;

export const findOrCreate: FindOrCreate = async ({ data }) => {
  const validationResult = athleteCreateSchema.safeParse(data);
  if (!validationResult.success) {
    throw new HttpError(400, validationResult.error.message);
  }

  const { firstName, lastName, suffix } = validationResult.data;

  let fullName = `${firstName} ${lastName}`;
  if (suffix) fullName += ` ${suffix}`;

  try {
    const athlete = await prisma.athlete.findFirst({
      where: { name: fullName },
    });
    if (athlete) {
      // if athlete found in db, evaluate whether the data is stale
      const timeElapsedSinceUpdate =
        new Date().getTime() - new Date(athlete.updatedAt).getTime();

      // convert timeElapsed (milliseconds) to hours, compare to stale limit
      const shouldRefresh =
        timeElapsedSinceUpdate / (60 * 60 * 1000) >= HOURS_TO_STALE;

      // if not stale, simply return
      if (!shouldRefresh) {
        return athlete;
      }

      console.log("Data was stale, re-fetching...");
    }

    return create({ data });
  } catch (e) {
    console.log("error getting one athlete in models: ", e);
  }
};
