import {createAthleteModel, getOneAthleteModel} from '../models/athletes';

export const createAthleteController = async (req, res) => {
  const { firstName, lastName, suffix } = req.body;
  try {
    await createAthleteModel(firstName, lastName, suffix);
    res.sendStatus(200);
  } catch (e) {
    console.log('Error in createAthlete: ', e);
    res.sendState(400);
  }
}

export const getOneAthleteController = async (req, res) => {
  const { first, last, suffix } = req.query;
  try {
    const athlete = await getOneAthleteModel(first, last, suffix);
    res.json(athlete)
  } catch (e) {
    console.log('Error getting one athlete: ', e);
    res.sendStatus(404);
  }
}