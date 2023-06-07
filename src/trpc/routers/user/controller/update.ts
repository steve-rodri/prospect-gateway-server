import { User } from "@prisma/client"

import { UserUpdateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type Update = ControllerMethod<
	User,
	{ input: UserUpdateSchema; ctx: AuthContext }
>

export const update: Update = async ({ input, ctx }) => {
	const { prisma } = ctx
	return prisma.user.update({
		where: { id: input.id },
		data: input,
		include: {
			holdings: true,
			competitionUserOne: true,
			competitionUserTwo: true,
			notificationSender: true,
			notificationRecipient: true
		}
	})
}
