import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as NotificationController from "./controller"
import {
	notificationCreateSchema,
	notificationUpdateSchema
} from "./validators"

export const notificationRouter = router({
	create: protectedProcedure
		.input(notificationCreateSchema)
		.mutation(NotificationController.create),
	update: protectedProcedure
		.input(notificationUpdateSchema)
		.mutation(NotificationController.update)
})
