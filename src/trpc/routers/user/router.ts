import * as UserController from "./controller"
import { userUpdateSchema } from "./validators"
import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"

export const userRouter = router({
	getUser: protectedProcedure.query(({ ctx }) =>
		UserController.findOne({ ctx })
	),
	updateUser: protectedProcedure
		.input(userUpdateSchema)
		.mutation(({ input, ctx }) => UserController.update({ input, ctx }))
})
