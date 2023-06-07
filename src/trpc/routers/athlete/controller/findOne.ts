import { Athlete } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

export const findOne: ControllerMethod<
	Athlete,
	{ id: string; ctx: AuthContext }
> = async ({ id, ctx }) => {
	const athlete = await ctx.prisma.athlete.findUnique({
		where: { id: Number(id) }
	})
	if (!athlete)
		throw new TRPCError({
			code: "NOT_FOUND",
			message: `Athlete with id:${id} was not found.`
		})
	return athlete
}
