import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// set the hour limit until data is considered stale
const HOURS_TO_STALE = 24;

const NBA_API_BASE = process.env.NBA_API_BASE;

export const createAthlete = async (
  firstName: string,
  lastName: string,
  suffix: string
) => {
  const athleteData = await axios.get(
    `${NBA_API_BASE}/athleteid?first=${firstName}&last=${lastName}&suffix=${suffix}`
  );
  const found = await prisma.athlete.findFirst({
    where: { id: athleteData.data.id },
  });

  // athlete is not currently in the database
  if (!found) {
    const profile = await axios.get(
      `${NBA_API_BASE}/profile?first=${firstName}&last=${lastName}&suffix=${suffix}`
    );

    return prisma.athlete.create({
      data: {
        id: profile.data.id,
        name: profile.data.name,
        age: profile.data.age,
        position: profile.data.position,
        origin: profile.data.origin,
        team_abbr: profile.data.team_abbr,
        image_url: profile.data.image_url,
        point_average: profile.data.career_averages.point_average,
        rebound_average: profile.data.career_averages.rebound_average,
        assist_average: profile.data.career_averages.assist_average,
        block_average: profile.data.career_averages.block_average,
        steal_average: profile.data.career_averages.steal_average,
        turnover_average: profile.data.career_averages.turnover_average,
      },
    });
  } else {
    // TODO: use last updated to determine if should fetch from nba_api and update data
    // const getLastUpdatedQuery = dbc('athletes').select('last_updated').where('id', '=', athleteId);
    // const lastUpdated = await getLastUpdatedQuery;
    // if lastUpdated was 24+hrs ago, re-fetch
  }
};

export const getOneAthlete = async (
  firstName: string,
  lastName: string,
  suffix: string
) => {
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

    return createAthlete(firstName, lastName, suffix);
  } catch (e) {
    console.log("error getting one athlete in models: ", e);
  }
};
