import { PrismaClient } from "@prisma/client";
import { NotificationType } from "../types";
// WARN: Make better use of Prisma types if possible

import {
  notificationCreateSchema,
  NotificationCreateSchema,
} from "../validators";
import { ControllerMethod } from "../../types";
import { HttpError } from "../../utils";

const prisma = new PrismaClient();

type Create = ControllerMethod<
  Notification,
  { data: NotificationCreateSchema }
>;

export const create: Create = async ({ data }) => {
  const validationResult = notificationCreateSchema.safeParse(data);
  if (!validationResult.success) {
    throw new HttpError(400, validationResult.error.message);
  }
  const { notificationType, senderId, recipientId } = validationResult.data;

  if (notificationType === NotificationType.FRIENDREQUEST) {
    // check for pre-existing friendRequest Notification
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
