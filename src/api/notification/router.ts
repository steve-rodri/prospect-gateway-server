import express, { Router } from "express";

import * as RequestHandlers from "./requestHandlers";
// import { requiredScopes } from 'express-oauth2-jwt-bearer'
// import { permissionsType } from '../../constants'

export const createNotificationRouter = (): Router => {
  const router = express.Router();

  // Scopes
  // const readScope = requiredScopes(permissionsType.moviesRead)
  // const writeScope = requiredScopes(permissionsType.moviesWrite)
  // const deleteScope = requiredScopes(permissionsType.moviesDelete)

  // View
  // router.get('/', readScope, RequestHandlers.find())
  // router.get("/", RequestHandlers.getNotifications());
  router.post("/", RequestHandlers.createNotification());

  // router.get("/:id", RequestHandlers.getNotification());
  router.patch("/:id", RequestHandlers.updateNotification());
  // router.delete("/:id", RequestHandlers.deleteNotification());

  return router;
};

export default createNotificationRouter();
