import { PrismaClient } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import Session from "supertokens-node/recipe/session"

type ContextOpts = CreateExpressContextOptions

export const createContext = async ({ req, res }: ContextOpts) => {
	const prisma = new PrismaClient()
	const session = await Session.getSession(req, res)
	if (session) {
		const id = session.getUserId()
		return { user: { id }, prisma }
	}
	return { prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>

export type AuthContext = {
	user: { id: string }
	prisma: PrismaClient
}
