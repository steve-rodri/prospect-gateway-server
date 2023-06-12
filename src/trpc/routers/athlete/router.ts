import { z } from "zod"
import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as AthleteController from "./controller"
// import { athleteSearchSchema } from "./validators"

export const athleteRouter = router({
	find: protectedProcedure
		.meta({ description: "Gets a list of Athletes" })
		.input(
			z
				.object({
					search: z
						.string()
						.optional()
						.describe("string to search for an athlete by name")
				})
				.optional()
		)
		.query(AthleteController.find),
	findOne: protectedProcedure
		.meta({ description: "Finds an Athlete by ID" })
		.input(z.object({ id: z.string() }))
		.query(AthleteController.findOne)

	// findOrCreate: protectedProcedure
	// 	.input(athleteSearchSchema)
	// 	.mutation(AthleteController.findOrCreate),
	// create: protectedProcedure
	// 	.input(athleteSearchSchema)
	// 	.mutation(AthleteController.create)
})
