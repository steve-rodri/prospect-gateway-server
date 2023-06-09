import { PrismaClient } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { SessionRequest } from "supertokens-node/framework/express"

type ContextOpts = {
	req: CreateExpressContextOptions["req"] & SessionRequest
	res: CreateExpressContextOptions["res"]
}

export const createContext = async ({ req }: ContextOpts) => {
	const prisma = new PrismaClient()
	if (req.session) {
		const id = req.session.getUserId()
		return { user: { id }, prisma }
	}
	return { prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>

export type AuthContext = {
	user: { id: string }
	prisma: PrismaClient
}
