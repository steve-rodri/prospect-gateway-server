import { Athlete } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

export const findOne: ControllerMethod<
	Athlete,
	{ input: { id: string }; ctx: AuthContext }
> = async ({ input, ctx }) => {
	const athlete = await ctx.prisma.athlete.findUnique({
		where: { id: input.id },
		include: {
			statistics: true,
			stock: {
				include: {
					priceHistory: true
				}
			}
		}
	})
	if (!athlete)
		throw new TRPCError({
			code: "NOT_FOUND",
			message: `Athlete with id:${input.id} was not found.`
		})
	return athlete
}
