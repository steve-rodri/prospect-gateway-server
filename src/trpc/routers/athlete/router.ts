import { z } from "zod"

import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as AthleteController from "./controller"
import { athleteFindSchema } from "./validators"

export const athleteRouter = router({
	find: protectedProcedure
		.meta({ description: "Gets a list of Athletes" })
		.input(athleteFindSchema.optional())
		.query(AthleteController.find),
	findOne: protectedProcedure
		.meta({ description: "Finds an Athlete by ID" })
		.input(z.object({ id: z.string() }))
		.query(AthleteController.findOne)
})
