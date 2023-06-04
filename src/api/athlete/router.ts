import { z } from "zod"
import { router } from "../../trpc/init"
import { protectedProcedure } from "../../trpc/protectedProcedure"
import * as AthleteController from "./controller"
import { athleteSearchSchema } from "./validators"

// import { permissionsType } from '../../constants'
// 	// const readScope = requiredScopes(permissionsType.moviesRead)
// 	// const writeScope = requiredScopes(permissionsType.moviesWrite)
// 	// const deleteScope = requiredScopes(permissionsType.moviesDelete)

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
