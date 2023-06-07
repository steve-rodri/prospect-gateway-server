import * as UserController from "./controller"
import { userCreateSchema, userUpdateSchema } from "./validators"
import { router } from "../../init"
import { protectedProcedure } from "../../protectedProcedure"

export const userRouter = router({
	findOrCreateUser: protectedProcedure
		.input(userCreateSchema)
		.mutation(({ input, ctx }) => UserController.findOrCreate({ input, ctx })),
	updateUser: protectedProcedure
		.input(userUpdateSchema)
		.mutation(({ input, ctx }) => UserController.update({ input, ctx }))
})
