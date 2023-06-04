import { NotificationUpdateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { Context } from "../../../trpc"

type Update = ControllerMethod<
	Notification,
	{ input: NotificationUpdateSchema; ctx: Context }
>

export const update: Update = async ({ input, ctx }) => {
	const { prisma } = ctx
	const { id, status } = input

	await prisma.notification.update({
		where: { id: Number(id) },
		data: { status }
	})
}
