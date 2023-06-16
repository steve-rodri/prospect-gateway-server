import { Competition } from "@prisma/client"

import { Context } from "../../../context"
import { ControllerMethod } from "../../types"
import { CompetitionUpdateSchema } from "../validators"

type Update = ControllerMethod<
	Competition,
	{ input: CompetitionUpdateSchema; ctx: Context }
>

export const update: Update = ({ input, ctx }) => {
	const { id, ...restInput } = input
	return ctx.prisma.competition.update({ where: { id }, data: restInput })
}
