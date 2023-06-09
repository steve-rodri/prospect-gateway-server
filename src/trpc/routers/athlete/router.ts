import { z } from "zod"
import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as AthleteController from "./controller"
// import { athleteSearchSchema } from "./validators"

export const athleteRouter = router({
	find: protectedProcedure
		.input(z.object({ search: z.string() }).optional())
		.query(AthleteController.find),
	findOne: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(AthleteController.findOne)

	// findOrCreate: protectedProcedure
	// 	.input(athleteSearchSchema)
	// 	.mutation(AthleteController.findOrCreate),
	// create: protectedProcedure
	// 	.input(athleteSearchSchema)
	// 	.mutation(AthleteController.create)
})
