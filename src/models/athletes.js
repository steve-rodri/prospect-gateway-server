import { NBA_API_BASE } from '../constants';
import dbc from '../db/dbc';
import axios from 'axios';

export const createAthleteModel = async (firstName, lastName, suffix) => {
  const athleteIdUrl = `${NBA_API_BASE}/athleteid?first=${firstName}&last=${lastName}&suffix=${suffix}`;
  const athleteIdData = await axios.get(athleteIdUrl);
  const athleteId = athleteIdData.data.id;
  const findAthleteQuery = dbc('athletes').where('id', '=', athleteId);
  const athleteResults = await findAthleteQuery;

  // athlete is not currently in the database
  if (athleteResults.length === 0) {
    const getProfileUrl = `${NBA_API_BASE}/profile?first=${firstName}&last=${lastName}&suffix=${suffix}`;
    const {data} = await axios.get(getProfileUrl);
    const isoDate = new Date().toISOString();
    await dbc('athletes').insert({
      id: data.id,
      name: data.name,
      age: data.age,
      position: data.position,
      origin: data.origin,
      team_abbr: data.team_abbr,
      last_updated: isoDate,
      last_accessed: isoDate,
      image_url: data.image_url,
      point_average: data.career_averages.point_average,
      rebound_average: data.career_averages.rebound_average,
      assist_average: data.career_averages.assist_average,
      block_average: data.career_averages.block_average,
      steal_average: data.career_averages.steal_average,
      turnover_average: data.career_averages.turnover_average,
    })
  } else {
    // TODO: use last updated to determine if should fetch from nba_api and update data
    const getLastUpdatedQuery = dbc('athletes').select('last_updated').where('id', '=', athleteId);
    const lastUpdated = await getLastUpdatedQuery;
  }
};

// should have logic for caching?
export const getOneAthleteModel = async (firstName, lastName, suffix) => {
  let fullName = `${firstName} ${lastName}`;
  if (suffix) fullName += ` ${suffix}`;

  try {
    // %name% important for cases with suffixes containing '.' (jr., sr.)
    const getOneQuery = dbc('athletes').whereILike('name', `%${fullName}%`);
    let athlete = (await getOneQuery)[0];
    if (athlete) {
      const updateAccessedQuery = dbc('athletes').whereILike('name', `%${fullName}%`).update({
        last_accessed: new Date().toISOString(),
      })
      await updateAccessedQuery;
      return athlete;
    } else {
      console.log('athlete was not found');
      // if there was no athlete in the database, fetch from api server
      await createAthleteModel(firstName, lastName, suffix);
      athlete = (await getOneQuery)[0];
      return athlete;
    }
  } catch (e) {
    console.log('error getting one athlete in models: ', e);
  }
};