import { Athlete } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { Context } from "../../../context"

type Find = {
	input?: { search?: string }
	ctx: Context
}

export const find: ControllerMethod<Athlete[], Find> = async ({
	input,
	ctx
}) => {
	return ctx.prisma.athlete.findMany({
		where: {
			name: {
				search: input?.search
			}
		},
		distinct: "name",
		include: {
			statistics: {
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
