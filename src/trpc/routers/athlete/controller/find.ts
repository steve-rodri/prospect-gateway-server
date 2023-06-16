import { Athlete } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { Context } from "../../../context"
import { AthleteFindSchema } from "../validators"

type Find = {
	input?: AthleteFindSchema
	ctx: Context
}

export const find: ControllerMethod<Athlete[], Find> = async ({
	input,
	ctx
}) => {
	return ctx.prisma.athlete.findMany({
		where: {
			name: {
				contains: input?.search,
				mode: "insensitive"
			}
		},
		distinct: "name",
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
}
