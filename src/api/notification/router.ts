import express, { Router } from "express";

import * as NotificationRequestHandlers from "./request-handlers";
// import { requiredScopes } from 'express-oauth2-jwt-bearer'
// import { permissionsType } from '../../constants'

// /api/v0/notifications
export const createNotificationRouter = (): Router => {
  const router = express.Router();

  // Scopes
  // const readScope = requiredScopes(permissionsType.moviesRead)
  // const writeScope = requiredScopes(permissionsType.moviesWrite)
  // const deleteScope = requiredScopes(permissionsType.moviesDelete)

  router.post("/", NotificationRequestHandlers.create());
  router.patch("/:id", NotificationRequestHandlers.update());
  return router;
};

export default createNotificationRouter();
