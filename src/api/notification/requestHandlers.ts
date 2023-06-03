import { RequestHandler, Request } from "express";
import * as NotificationController from "./controller";
import { createRequestHandler } from "../utils";
import {
  NotificationCreateSchema,
  NotificationUpdateSchema,
} from "./validators";

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

export const createNotification = (): RequestHandler<
  {},
  void,
  NotificationCreateSchema
> => {
  const operation = async (req: Request<{}, void, NotificationCreateSchema>) =>
    NotificationController.createNotification({ data: req.body });
  return createRequestHandler(operation, 201);
};

export const updateNotification = (): RequestHandler<
  { id: string },
  void | { message: string },
  NotificationUpdateSchema
> => {
  const operation = async (
    req: Request<
      { id: string },
      void | { message: string },
      NotificationUpdateSchema
    >
  ) => {
    const { id } = req.params;
    return NotificationController.updateNotification({ id, data: req.body });
  };
  return createRequestHandler(operation, 200);
};

// export const deleteNotification = (): RequestHandler => {
//   const operation = async (req: Request) => {
//     const { id } = req.params;
//     return NotificationController.deleteNotification({ id });
//   };
//   return createRequestHandler(operation, 204);
// };
