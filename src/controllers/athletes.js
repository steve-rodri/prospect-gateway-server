import athletes from '../models/athletes';

export default {
  createAthlete: async (req, res) => {
    const { firstName, lastName, suffix } = req.body;
    try {
      await athletes.createAthlete(firstName, lastName, suffix);
      res.sendStatus(200);
    } catch (e) {
      console.log('Error in createAthlete: ', e);
      res.sendState(400);
    }
  },
  getOne: async (req, res) => {
    const { firstName, lastName, suffix } = req.params;
    try {
      const athlete = await athletes.getOne(firstName, lastName, suffix);
      res.json(athlete)
    } catch (e) {
      console.log('Error getting one athlete: ', e);
      res.sendStatus(404);
    }
  },
}