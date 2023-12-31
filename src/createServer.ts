import { PrismaClient } from "@prisma/client"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import compression from "compression"
import cors from "cors"
import express from "express"
import http from "http"
import supertokens from "supertokens-node"
import {
	errorHandler,
	middleware as supertokensMiddleware} from "supertokens-node/framework/express"
import { verifySession } from "supertokens-node/recipe/session/framework/express"
import { renderTrpcPanel } from "trpc-panel"
import { expressHandler } from "trpc-playground/handlers/express"

import { BASE_URL, CLIENT_URL } from "./env"
import { loggerMiddleware } from "./logger"
import { initSuperTokens } from "./supertokens/init"
import { appRouter, createContext } from "./trpc"
import { ApplicationServer } from "./types"

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
			// TODO: Add Origin for Mobile App
			origin: CLIENT_URL,
			allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
			credentials: true
		})
	)
	app.use(supertokensMiddleware())
	app.use(compression())
	app.use("/trpc", verifySession(), trpcExpressMiddleware)

	// TODO: Get Trpc playground to work
	app.use(
		"/trpc-playground",
		await expressHandler({
			trpcApiEndpoint: "/trpc",
			playgroundEndpoint: "/trpc-playground",
			router: appRouter
			// request: {
			// 	globalHeaders: {
			// 		Authorization: `Bearer ${process.env.CLIENT_TOKEN}`
			// 	}
			// },

			// uncomment this if you're using superjson
			// request: {
			//   superjson: true,
			// },
		})
	)

	app.use("/panel", (_, res) => {
		return res.send(renderTrpcPanel(appRouter, { url: `${BASE_URL}/trpc` }))
	})

	app.use(errorHandler())
	return {
		app: http.createServer(app),
		prisma: new PrismaClient()
	}
}

export default createServer
