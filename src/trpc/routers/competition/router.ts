import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as CompetitionController from "./controller"
import { competitionCreateSchema, competitionUpdateSchema } from "./validators"

export const competitionRouter = router({
	create: protectedProcedure
		.meta({ description: "Creates a new Competition" })
		.input(competitionCreateSchema)
		.mutation(CompetitionController.create),
	update: protectedProcedure
		.meta({ description: "Updates a Competition" })
		.input(competitionUpdateSchema)
		.mutation(CompetitionController.update)
})
