import { PrismaClient } from "@prisma/client";

import {
  notificationUpdateSchema,
  NotificationUpdateSchema,
} from "../validators";
import { ControllerMethod } from "../../types";
import { HttpError } from "../../utils";

const prisma = new PrismaClient();

export const updateNotification: ControllerMethod<
  void,
  { id: string; data: NotificationUpdateSchema }
> = async ({ id, data }) => {
  const validationResult = notificationUpdateSchema.safeParse(data);
  if (!validationResult.success) {
    throw new HttpError(400, validationResult.error.message);
  }

  const { status } = validationResult.data;

  await prisma.notification.update({
    where: { id: Number(id) },
    data: { status },
  });
};
