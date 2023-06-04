import { PrismaClient } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"

type ContextOpts = CreateExpressContextOptions

export const createContext = async ({ req }: ContextOpts) => {
	const prisma = new PrismaClient()

	const getUserFromHeader = async () => {
		if (req.headers.authorization) {
			// TODO: Add AuthO or Clerk auth middleware
			// const user = await decodeAndVerifyJwtToken(
			// 	req.headers.authorization.split(" ")[1]
			// )
			// return user
		}
		return null
	}

	const user = await getUserFromHeader()
	return { user, prisma }
} // no context

export type Context = inferAsyncReturnType<typeof createContext>
