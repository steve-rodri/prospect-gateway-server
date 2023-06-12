import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as NotificationController from "./controller"
import {
	notificationCreateSchema,
	notificationUpdateSchema
} from "./validators"

export const notificationRouter = router({
	create: protectedProcedure
		.meta({ description: "Creates a new Notification" })
		.input(notificationCreateSchema)
		.mutation(NotificationController.create),
	update: protectedProcedure
		.meta({ description: "Updates a Notification" })
		.input(notificationUpdateSchema)
		.mutation(NotificationController.update)
})
