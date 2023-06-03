import { z } from "zod"
import { NotificationStatus, NotificationType } from "./types"

export const notificationCreateSchema = z.object({
	notificationType: z.union([
		z.literal(NotificationType.COMPETITION),
		z.literal(NotificationType.FRIENDREQUEST)
	]),
	senderId: z.number(),
	recipientId: z.number()
})

export const notificationUpdateSchema = z.object({
	status: z.union([
		z.literal(NotificationStatus.PENDING),
		z.literal(NotificationStatus.REJECTED),
		z.literal(NotificationStatus.SUCCESS)
	])
})

export type NotificationCreateSchema = z.infer<typeof notificationCreateSchema>
export type NotificationUpdateSchema = z.infer<typeof notificationUpdateSchema>
