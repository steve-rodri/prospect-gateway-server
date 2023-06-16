import { faker } from "@faker-js/faker"
import {
	NotificationStatus,
	NotificationType,
	Prisma,
	PrismaClient,
	User
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
	users: User[]
): Prisma.NotificationCreateInput => ({
	sender: {
		connect: {
			id: users[0].id
		}
	},
	recipient: {
		connect: {
			id: users[1].id
		}
	},
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
			return prisma.notification.create({
				data: genFakeNotification(randomUsers)
			})
		})
	)
}
