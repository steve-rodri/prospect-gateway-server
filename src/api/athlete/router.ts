import express, { Router } from "express"
import { publicProcedure, router } from "../../trpc"

import * as AthleteRequestHandlers from "./request-handlers"
// import { requiredScopes } from 'express-oauth2-jwt-bearer'
// import { permissionsType } from '../../constants'

export const athleteRouter = router({
	getAthletes: publicProcedure.query(() => "get Athletes"),
	createAthlete: publicProcedure.mutation(() => "create Athlete"),
	findOrCreateAthlete: publicProcedure.query(() => "find or create Athlete"),
	findOneAthlete: publicProcedure.query(() => "find one Athlete")
})

// // /api/v0/athlete
// export const createAthleteRouter = (): Router => {
// 	// const router = express.Router()
// 	// Scopes
// 	// const readScope = requiredScopes(permissionsType.moviesRead)
// 	// const writeScope = requiredScopes(permissionsType.moviesWrite)
// 	// const deleteScope = requiredScopes(permissionsType.moviesDelete)
// 	// router.get("/", AthleteRequestHandlers.find())
// 	// router.post("/", AthleteRequestHandlers.create())
// 	// router.get("/search", AthleteRequestHandlers.findOrCreate())
// 	// router.get("/:id", AthleteRequestHandlers.findOne())
// 	// return router
// }

// export default createAthleteRouter()
