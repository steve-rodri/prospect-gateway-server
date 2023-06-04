import { z } from "zod"
import { router } from "../../trpc/init"
import { protectedProcedure } from "../../trpc/protectedProcedure"
import * as AthleteController from "./controller"
import { athleteSearchSchema } from "./validators"

// import { permissionsType } from '../../constants'

export const athleteRouter = router({
	getAthletes: protectedProcedure.query(({ ctx }) =>
		AthleteController.find(ctx)
	),
	createAthlete: protectedProcedure
		.input(athleteSearchSchema)
		.mutation(({ input, ctx }) => AthleteController.create({ input, ctx })),
	findOrCreateAthlete: protectedProcedure
		.input(athleteSearchSchema)
		.query(({ input, ctx }) => AthleteController.findOrCreate({ input, ctx })),
	findOneAthlete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(({ input, ctx }) => AthleteController.findOne({ id: input.id, ctx }))
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
