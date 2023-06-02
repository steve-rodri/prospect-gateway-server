import { PrismaClient } from "@prisma/client";
import { NotificationType, NotificationStatus } from "./notification.types";
// WARN: Make better use of Prisma types if possible

const prisma = new PrismaClient();

export const createNotification = async (
  notificationType: NotificationType,
  senderId: number,
  recipientId: number
) => {
  if (notificationType === NotificationType.FRIENDREQUEST) {
    // check for pre-exisiting friendRequest Notification
    const friendRequestNotificationPresent =
      await prisma.notification.findFirst({
        where: {
          type: NotificationType.FRIENDREQUEST,
          OR: [
            {
              sender_id: senderId,
              recipient_id: recipientId,
            },
            {
              sender_id: recipientId,
              recipient_id: senderId,
            },
          ],
        },
      });
    // if present exit
    if (friendRequestNotificationPresent) return;
  }

  await prisma.notification.create({
    data: {
      type: notificationType,
      sender_id: senderId,
      recipient_id: recipientId,
    },
  });
};

export const updateNotification = async (
  notificationId: number,
  newStatus: NotificationStatus
) => {
  await prisma.notification.update({
    where: { id: notificationId },
    data: { status: newStatus },
  });
};
