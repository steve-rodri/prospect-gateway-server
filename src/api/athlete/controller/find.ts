import { Athlete } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { Context } from "../../../trpc"

type Find = {
	input: { search: string }
	ctx: Context
}

export const find: ControllerMethod<Athlete[], Find> = async ({
	input,
	ctx
}) => {
	return ctx.prisma.athlete.findMany({
		where: {
			name: {
				contains: input.search
			}
		},
		distinct: "name"
	})
}
