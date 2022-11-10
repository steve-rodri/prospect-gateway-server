import { NBA_API_BASE } from '../constants';
import dbc from '../db/dbc';
import axios from 'axios';

export default {
  createAthlete : async (firstName, lastName, suffix) => {
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
      const getLastUpdatedQuery = dbc('athletes').select('last_updated').where('id', '=', athleteId);
      const lastUpdated = await getLastUpdatedQuery;
      console.log('athlete exists, might need updating: ', lastUpdated);
    }
  }
}