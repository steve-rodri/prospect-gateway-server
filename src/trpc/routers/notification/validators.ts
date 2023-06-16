import { z } from "zod"

import { NotificationStatus, NotificationType } from "./types"

export const notificationCreateSchema = z.object({
	notificationType: z
		.union([
			z.literal(NotificationType.COMPETITION),
			z.literal(NotificationType.FRIENDREQUEST)
		])
		.describe("the type of notification. i.e. 'Friend Request' "),
	senderId: z.string().describe("the user id of the sender"),
	recipientId: z.string().describe("the user id of the recipient")
})

export const notificationUpdateSchema = z.object({
	id: z.string(),
	status: z.union([
		z.literal(NotificationStatus.PENDING),
		z.literal(NotificationStatus.REJECTED),
		z.literal(NotificationStatus.SUCCESS)
	])
})

export type NotificationCreateSchema = z.infer<typeof notificationCreateSchema>
export type NotificationUpdateSchema = z.infer<typeof notificationUpdateSchema>
