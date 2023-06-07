import { publicProcedure, middleware } from "./init"
import { TRPCError } from "@trpc/server"

const isAuthenticated = middleware(async ({ ctx, next }) => {
	if (!ctx.auth?.uid) {
		throw new TRPCError({ code: "UNAUTHORIZED" })
	}
	return next({ ctx: { ...ctx, auth: { uid: ctx.auth.uid } } })
})

export const protectedProcedure = publicProcedure.use(isAuthenticated)
