import { Competition } from "@prisma/client"

import { Context } from "../../../context"
import { ControllerMethod } from "../../types"
import { CompetitionCreateSchema } from "../validators"

type Create = ControllerMethod<
	Competition,
	{ input: CompetitionCreateSchema; ctx: Context }
>

export const create: Create = async ({ input, ctx }) => {
	return ctx.prisma.competition.create({
		data: {
			competitionTypeId: input.competitionTypeId,
			athletes: { createMany: { data: input.athletes } }
		}
	})
}
