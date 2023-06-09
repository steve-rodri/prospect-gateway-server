import { NotificationUpdateSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

type Update = ControllerMethod<
	Notification,
	{ input: NotificationUpdateSchema; ctx: AuthContext }
>

export const update: Update = async ({ input, ctx }) => {
	await ctx.prisma.notification.update({
		where: { id: input.id },
		data: { status: input.status }
	})
}
