import * as express from 'express';
// import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { getOneAthlete, createAthlete } from './models/athletes';
import { createNotification, updateNotification } from './models/notifications';

let PORT = 5500;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// TODO: build a jwt verification middleware (or find a package) -- this will be in one level higher -- gateway

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
    // should post send back athlete?
    res.sendStatus(200);
  } catch (e) {
    console.log('Error in createAthlete: ', e);
    res.sendStatus(400);
  }
});

// post - send notification
// update - accept/reject notification
  // if the notification is a friend request, insert into friends table
  // if the notification is a competition invite, figure out that logic
  // what other notifications might we have? will all we "interactive"?


// body: { notificationName: ["friend", "competition", "etc."], sender: "knissley", recipient: "esabini" }
app.post("/api/v0/notification", async (req, res) => {
  const {notificationName, senderName, recipientName} = req.body;
  try {
    await createNotification(notificationName, senderName, recipientName);
    res.sendStatus(200);
  } catch (e) {
    console.log('Error in notification post: ', e);
    res.sendStatus(400);
  }
});

// body: { newStatus: ["rejected", "pending", "success"] }
app.patch("/api/v0/notification/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  const { newStatus } = req.body;

  if (!notificationId) res.sendStatus(400);

  try {
    await updateNotification(notificationId, newStatus);
    res.sendStatus(200);
  } catch (e) {
    console.log('Error updating notification: ', e);
    res.sendStatus(400);
  }
});

// get by ID, not currently needed
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

console.log(`Listening on ${PORT}...`);
app.listen(PORT)