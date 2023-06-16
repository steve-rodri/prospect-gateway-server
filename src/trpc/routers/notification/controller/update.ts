import { Context } from "../../../context"
import { ControllerMethod } from "../../types"
import { NotificationUpdateSchema } from "../validators"

type Update = ControllerMethod<
	Notification,
	{ input: NotificationUpdateSchema; ctx: Context }
>

export const update: Update = async ({ input, ctx }) => {
	await ctx.prisma.notification.update({
		where: { id: input.id },
		data: { status: input.status }
	})
}
