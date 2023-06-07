import { User } from "@prisma/client"

import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type Me = ControllerMethod<User | null, { ctx: AuthContext }>

export const me: Me = async ({ ctx }) => {
	return ctx.prisma.user.findUnique({
		where: { id: ctx.user.id },
		include: {
			holdings: true,
			competitionUserOne: true,
			competitionUserTwo: true,
			notificationSender: true,
			notificationRecipient: true
		}
	})
}
