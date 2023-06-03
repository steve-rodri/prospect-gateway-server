import { RequestHandler } from "express";

import * as NotificationController from "./controller";
import {
  NotificationCreateSchema,
  NotificationUpdateSchema,
} from "./validators";
import { HttpError } from "../utils";

export type CreateNotificationReqHandler = () => RequestHandler<
  {},
  void | { message: string },
  NotificationCreateSchema
>;

export const createNotification: CreateNotificationReqHandler = () => {
  return async (req, res) => {
    try {
      await NotificationController.create({
        data: req.body,
      });
      return res.status(201);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message);
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json();
    }
  };
};

export type UpdateNotificationReqHandler = () => RequestHandler<
  { id: string },
  void | { message: string },
  NotificationUpdateSchema
>;

export const updateNotification: UpdateNotificationReqHandler = () => {
  return async (req, res) => {
    try {
      await NotificationController.update({
        id: req.params.id,
        data: req.body,
      });
      return res.status(200);
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(error.message);
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500);
    }
  };
};

// export const getNotifications = (): RequestHandler => {
//   const operation = async () => NotificationController.getNotifications();
//   return createRequestHandler(operation, 200);
// };

// export const getNotification = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return NotificationController.getNotification({ id });
//   };
//   return createRequestHandler(operation, 200);
// };

// export const deleteNotification = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return NotificationController.deleteNotification({ id });
//   };
//   return createRequestHandler(operation, 204);
// };
