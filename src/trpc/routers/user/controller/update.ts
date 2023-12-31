import { User } from "@prisma/client"

import { Context } from "../../../context"
import { ControllerMethod } from "../../types"
import { UserUpdateSchema } from "../validators"

type Update = ControllerMethod<User, { input: UserUpdateSchema; ctx: Context }>

export const update: Update = async ({ input, ctx }) => {
	return ctx.prisma.user.update({
		where: { id: input.id },
		data: input,
		include: {
			sentNotifications: {
				include: {
					recipient: true
				}
			},
			receivedNotifications: {
				include: {
					sender: true
				}
			},
			holdings: {
				include: {
					athlete: {
						include: {
							stock: true
						}
					}
				}
			},
			competitions: {
				include: {
					athlete: {
						include: {
							stock: true
						}
					},
					competition: true
				}
			}
		}
	})
}
