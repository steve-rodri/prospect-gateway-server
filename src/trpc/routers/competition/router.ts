import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as CompetitionController from "./controller"
import { competitionCreateSchema, competitionUpdateSchema } from "./validators"

export const competitionRouter = router({
	create: protectedProcedure
		.input(competitionCreateSchema)
		.mutation(CompetitionController.create),
	update: protectedProcedure
		.input(competitionUpdateSchema)
		.mutation(CompetitionController.update)
})
