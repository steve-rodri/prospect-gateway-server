import { faker } from "@faker-js/faker"
import {
	Notification,
	NotificationType,
	NotificationStatus,
	User,
	PrismaClient
} from "@prisma/client"
import { getTwoRandomUsers } from "../utils/getTwoRandomUsers"

const notificationTypes = [
	NotificationType.Competition,
	NotificationType.FriendRequest
]

const notificationStatuses = [
	NotificationStatus.pending,
	NotificationStatus.rejected,
	NotificationStatus.success
]

const genFakeNotification = (
	senderId: number,
	recipientId: number
): Omit<Notification, "id" | "updatedAt"> => ({
	senderId,
	recipientId,
	type: notificationTypes[
		Math.floor(Math.random() * (notificationTypes.length - 1))
	],
	status:
		notificationStatuses[
			Math.floor(Math.random() * (notificationStatuses.length - 1))
		],
	dateSent: faker.date.past()
})

export const seedNotifications = async ({
	amount = 20,
	prisma,
	users
}: {
	amount?: number
	prisma: PrismaClient
	users: User[]
}) => {
	await Promise.all(
		Array.from({ length: amount }, async () => {
			const randomUsers = getTwoRandomUsers(users)
			if (!randomUsers.one) return
			if (!randomUsers.two) return
			return prisma.notification.create({
				data: genFakeNotification(randomUsers.one.id, randomUsers.two.id)
			})
		})
	)
}
