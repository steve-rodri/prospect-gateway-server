import express, { Router } from "express";

import * as RequestHandlers from "./requestHandlers";
// import { requiredScopes } from 'express-oauth2-jwt-bearer'
// import { permissionsType } from '../../constants'

export const createAthleteRouter = (): Router => {
  const router = express.Router();

  // Scopes
  // const readScope = requiredScopes(permissionsType.moviesRead)
  // const writeScope = requiredScopes(permissionsType.moviesWrite)
  // const deleteScope = requiredScopes(permissionsType.moviesDelete)

  // View
  // router.get('/', readScope, RequestHandlers.find())
  // router.get("/", RequestHandlers.getAthletes());
  router.get("/search", RequestHandlers.findOrCreateAthlete());
  router.post("/", RequestHandlers.createAthlete());

  // router.get("/:id", RequestHandlers.getAthlete());
  // router.patch("/:id", RequestHandlers.updateAthlete());
  // router.delete("/:id", RequestHandlers.deleteAthlete());

  return router;
};

export default createAthleteRouter();
