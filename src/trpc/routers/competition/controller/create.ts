import { CompetitionCreateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"
import { Competition } from "@prisma/client"

type Create = ControllerMethod<
	Competition,
	{ input: CompetitionCreateSchema; ctx: AuthContext }
>

export const create: Create = async ({ input, ctx }) => {
	return ctx.prisma.competition.create({ data: input })
}
