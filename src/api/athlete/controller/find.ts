import { Context } from "../../../trpc"
import { ControllerMethod } from "../../types"
import { Athlete } from "@prisma/client"

export const find: ControllerMethod<Athlete[], Context> = async ({
	prisma
}: Context) => {
	const athletes = await prisma.athlete.findMany()
	return athletes
}
