import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { getOneAthlete, createAthlete } from './models/athletes';

let PORT = 5500;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get("/api/v0/athletes(/:athleteId)?", async (req, res) => {
//   const athleteId = req.params.athleteId;
//   if (!athleteId) {
//     // get all
//     // should this even be allowed? would be 100's of athletes
//     res.send(404, 'must provide athlete id');
//   } else {
//     // get by Id

//   }
// });

app.get("/api/v0/athlete", async (req, res) => {
  const { first, last, suffix } = req.query;
  try {
    const athlete = await getOneAthlete(first, last, suffix);
    res.json(athlete)
  } catch (e) {
    console.log('Error getting one athlete: ', e);
    res.sendStatus(404);
  }
});

app.post("/api/v0/athletes(/:athleteId)?", async (req, res) => {
  const { firstName, lastName, suffix } = req.body;
  try {
    await createAthlete(firstName, lastName, suffix);
    res.sendStatus(200);
  } catch (e) {
    console.log('Error in createAthlete: ', e);
    res.sendState(400);
  }
});

console.log(`Listening on ${PORT}...`);
app.listen(PORT)