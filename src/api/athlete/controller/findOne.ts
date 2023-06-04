import { ControllerMethod } from "../../types"
import { Athlete } from "@prisma/client"
import { Context } from "../../../trpc"
import { TRPCError } from "@trpc/server"

export const findOne: ControllerMethod<
	Athlete,
	{ id: string; ctx: Context }
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
