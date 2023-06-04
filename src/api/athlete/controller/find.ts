import { Athlete } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { Context } from "../../../trpc"

export const find: ControllerMethod<Athlete[], Context> = async ({
	prisma
}: Context) => {
	const athletes = await prisma.athlete.findMany()
	return athletes
}
