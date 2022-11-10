import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import athletes from './controllers/athletes';

let PORT = 5500;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/v0/athletes(/:athleteId)?", async (req, res) => {
  const athleteId = req.params.athleteId;
  if (!athleteId) {
    // get all
    // should this even be allowed? would be 100's of athletes
    res.send(404, 'must provide athlete id');
  } else {
    // get by Id

  }
});

app.get("/api/v0/athlete", (req, res) => {
  athletes.getOne(req, res);
})

app.post("/api/v0/athletes(/:athleteId)?", (req, res) => {
  athletes.createAthlete(req, res);
});

console.log(`Listening on ${PORT}...`);
app.listen(PORT)