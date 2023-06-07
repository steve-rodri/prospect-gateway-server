import * as UserController from "./controller"
import { userUpdateSchema } from "./validators"
import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"

export const userRouter = router({
	me: protectedProcedure.query(UserController.me),
	update: protectedProcedure
		.input(userUpdateSchema)
		.mutation(UserController.update)
})
