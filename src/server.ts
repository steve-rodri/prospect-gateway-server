import express from "express";
// import * as cors from 'cors';
import bodyParser from "body-parser";
import { getOneAthlete, createAthlete } from "./models/athlete";
import { createNotification, updateNotification } from "./models/notification";
import { Athlete } from "@prisma/client";
import {
  NotificationStatus,
  NotificationType,
} from "./models/notification.types";

const app = express();

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// TODO: build a jwt verification middleware (or find a package) -- this will be in one level higher -- gateway

app.get<
  {},
  Athlete,
  undefined,
  { first: string; last: string; suffix: string }
>("/api/v0/athlete", async (req, res) => {
  const { first, last, suffix } = req.query;
  try {
    const athlete = await getOneAthlete(first, last, suffix);
    if (athlete) res.status(200).send(athlete);
  } catch (e) {
    console.log("Error getting one athlete: ", e);
    res.sendStatus(404);
  }
});

app.post<
  {},
  Athlete,
  {
    firstName: string;
    lastName: string;
    suffix: string;
  }
>("/api/v0/athletes", async (req, res) => {
  const { firstName, lastName, suffix } = req.body;
  try {
    const athlete = await createAthlete(firstName, lastName, suffix);
    if (athlete) res.status(201).send(athlete);
  } catch (e) {
    console.log("Error in createAthlete: ", e);
    res.sendStatus(400);
  }
});

// post - send notification
// update - accept/reject notification
// if the notification is a friend request, insert into friends table
// if the notification is a competition invite, figure out that logic
// what other notifications might we have? will all we "interactive"?

// body: { notificationName: ["friend", "competition", "etc."], sender: "knissley", recipient: "esabini" }
app.post<
  {},
  void,
  {
    notificationType: NotificationType;
    senderId: number;
    recipientId: number;
  }
>("/api/v0/notification", async (req, res) => {
  const { notificationType, senderId, recipientId } = req.body;
  try {
    await createNotification(notificationType, senderId, recipientId);
    res.sendStatus(200);
  } catch (e) {
    console.log("Error in notification post: ", e);
    res.sendStatus(400);
  }
});

app.patch<
  { notificationId: string },
  void | { message: string },
  { newStatus: NotificationStatus }
>("/api/v0/notification/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  const { newStatus } = req.body;

  if (!notificationId) res.status(400).send({ message: "No Notification ID" });

  try {
    await updateNotification(Number(notificationId), newStatus);
    res.sendStatus(200);
  } catch (e) {
    console.log("Error updating notification: ", e);
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

console.log(`Listening on ${process.env.PORT}...`);
app.listen(process.env.PORT);
