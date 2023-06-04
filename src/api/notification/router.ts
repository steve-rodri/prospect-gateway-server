import { router } from "../../trpc/init"
import { protectedProcedure } from "../../trpc/protectedProcedure"
import * as NotificationController from "./controller"
import {
	notificationCreateSchema,
	notificationUpdateSchema
} from "./validators"

export const notificationRouter = router({
	createNotification: protectedProcedure
		.input(notificationCreateSchema)
		.mutation(({ input, ctx }) =>
			NotificationController.create({ input, ctx })
		),
	updateNotification: protectedProcedure
		.input(notificationUpdateSchema)
		.mutation(({ input, ctx }) => NotificationController.update({ input, ctx }))
})
