import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"
import * as UserController from "./controller"
import { userUpdateSchema } from "./validators"

export const userRouter = router({
	me: protectedProcedure
		.meta({ description: "Gets the currently logged in User" })
		.query(UserController.me),
	update: protectedProcedure
		.meta({ description: "Updates the currently logged in User" })
		.input(userUpdateSchema)
		.mutation(UserController.update)
})
