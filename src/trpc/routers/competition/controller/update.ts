import { CompetitionUpdateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { Context } from "../../../context"
import { Competition } from "@prisma/client"

type Update = ControllerMethod<
	Competition,
	{ input: CompetitionUpdateSchema; ctx: Context }
>

export const update: Update = ({ input, ctx }) => {
	const { id, ...restInput } = input
	return ctx.prisma.competition.update({ where: { id }, data: restInput })
}
