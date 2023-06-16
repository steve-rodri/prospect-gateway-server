import { TRPCError } from "@trpc/server"

import { middleware,publicProcedure } from "./init"

const isAuthenticated = middleware(async ({ ctx, next }) => {
	if (!ctx.user?.id) {
		throw new TRPCError({ code: "UNAUTHORIZED" })
	}
	return next({ ctx: { ...ctx, user: { id: ctx.user.id } } })
})

export const protectedProcedure = publicProcedure.use(isAuthenticated)
