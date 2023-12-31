import { Athlete } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { Context } from "../../../context"
import { ControllerMethod } from "../../types"

export const findOne: ControllerMethod<
	Athlete,
	{ input: { id: string }; ctx: Context }
> = async ({ input, ctx }) => {
	const athlete = await ctx.prisma.athlete.findUnique({
		where: { id: input.id },
		include: {
			stats: {
				select: {
					pointAverage: true,
					reboundAverage: true,
					assistAverage: true,
					blockAverage: true,
					stealAverage: true,
					turnoverAverage: true
				}
			},
			stock: {
				select: {
					ipo: true,
					icp: true,
					priceHistory: {
						select: { date: true, price: true }
					}
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
