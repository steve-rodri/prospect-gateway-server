import { User } from "@prisma/client"

import { UserCreateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type FindOrCreate = ControllerMethod<
	User,
	{
		input: UserCreateSchema
		ctx: AuthContext
	}
>

export const findOrCreate: FindOrCreate = async ({ input, ctx }) => {
	const { prisma, auth } = ctx
	const user = await prisma.user.findUnique({
		where: { uid: auth.uid },
		include: {
			holdings: true,
			competitionUserOne: true,
			competitionUserTwo: true,
			notificationSender: true,
			notificationRecipient: true
		}
	})
	if (user) return user
	return prisma.user.create({
		data: { uid: auth.uid, email: input.email },
		include: {
			holdings: true,
			competitionUserOne: true,
			competitionUserTwo: true,
			notificationSender: true,
			notificationRecipient: true
		}
	})
}
