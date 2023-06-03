import { ControllerMethod } from "../../types"
import { Athlete, PrismaClient } from "@prisma/client"
import { HttpError } from "../../utils"

const prisma = new PrismaClient()

export const findOne: ControllerMethod<Athlete, { id: string }> = async ({
	id
}) => {
	const athlete = await prisma.athlete.findUnique({
		where: { id: Number(id) }
	})
	if (!athlete) throw new HttpError(404, `Athlete with id:${id} was not found.`)
	return athlete
}
