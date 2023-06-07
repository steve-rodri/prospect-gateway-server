import { Athlete } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type Find = {
	input?: { search: string }
	ctx: AuthContext
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
		distinct: "name"
	})
}
