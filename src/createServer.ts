import { PrismaClient } from "@prisma/client"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"

import { loggerMiddleware } from "./logger"
import { appRouter, createContext } from "./trpc"
import { ApplicationServer } from "./types"

const trpcExpressMiddleware = createExpressMiddleware({
	router: appRouter,
	createContext
})

export const createServer = async (): Promise<ApplicationServer> => {
	const app = express()
	if (process.env.NODE_ENV !== "TEST") app.use(loggerMiddleware)
	app.use(express.json())
	app.use(cors())
	app.use(compression())
	app.use("/trpc", trpcExpressMiddleware)
	return {
		app: http.createServer(app),
		prisma: new PrismaClient()
	}
}

export default createServer
