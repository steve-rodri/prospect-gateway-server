import { NotificationType } from "../types"

import { NotificationCreateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type Create = ControllerMethod<
	Notification,
	{ input: NotificationCreateSchema; ctx: AuthContext }
>

export const create: Create = async ({ input, ctx }) => {
	const { prisma } = ctx
	const { notificationType, senderId, recipientId } = input

	if (notificationType === NotificationType.FRIENDREQUEST) {
		// check for pre-existing friendRequest Notification
		const friendRequestNotificationPresent =
			await prisma.notification.findFirst({
				where: {
					type: NotificationType.FRIENDREQUEST,
					OR: [
						{
							senderId,
							recipientId
						},
						{
							senderId: recipientId,
							recipientId: senderId
						}
					]
				}
			})
		// if present exit
		if (friendRequestNotificationPresent) return
	}

	await prisma.notification.create({
		data: {
			type: notificationType,
			senderId: senderId,
			recipientId: recipientId
		}
	})
}
