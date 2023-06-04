import { publicProcedure, middleware } from "./init"
import { TRPCError } from "@trpc/server"

const isAuthenticated = middleware(opts => {
	const { ctx } = opts
	if (!ctx.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" })
	}
	return opts.next({
		ctx: {
			user: ctx.user
		}
	})
})

export const protectedProcedure = publicProcedure.use(isAuthenticated)
