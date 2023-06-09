import { PrismaClient } from "@prisma/client"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"
import supertokens from "supertokens-node"
import { verifySession } from "supertokens-node/recipe/session/framework/express"
import {
	middleware as supertokensMiddleware,
	errorHandler
} from "supertokens-node/framework/express"

import { loggerMiddleware } from "./logger"
import { appRouter, createContext } from "./trpc"
import { ApplicationServer } from "./types"
import { initSuperTokens } from "./supertokens/init"

const trpcExpressMiddleware = createExpressMiddleware({
	router: appRouter,
	createContext
})

export const createServer = async (): Promise<ApplicationServer> => {
	initSuperTokens()
	const app = express()
	if (process.env.NODE_ENV !== "TEST") app.use(loggerMiddleware)
	app.use(express.json())
	app.use(
		cors({
			origin: "http://localhost:19000",
			allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
			credentials: true
		})
	)
	app.use(supertokensMiddleware())
	app.use(compression())
	app.use("/trpc", verifySession(), trpcExpressMiddleware)
	app.use(errorHandler())
	return {
		app: http.createServer(app),
		prisma: new PrismaClient()
	}
}

export default createServer
