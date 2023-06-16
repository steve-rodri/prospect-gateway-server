import { User } from "@prisma/client"
import { TRPCError } from "@trpc/server"

import { Context } from "../../../context"
import { ControllerMethod } from "../../types"

type Me = ControllerMethod<User | null, { ctx: Context }>

export const me: Me = async ({ ctx }) => {
	const user = await ctx.prisma.user.findUnique({
		where: { id: ctx.user?.id },
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
	if (!user)
		throw new TRPCError({ code: "NOT_FOUND", message: "No User found" })
	return user
}
