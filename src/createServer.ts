import express from "express"
import compression from "compression"
import cors from "cors"
// import swaggerUi from "swagger-ui-express";

import { ApplicationServer } from "./types"
import { loggerMiddleware } from "./logger"
import http from "http"
import athleteRouter from "./api/athlete/router"
import notificationRouter from "./api/notification/router"
import { PrismaClient } from "@prisma/client"
// import { swaggerDocument, swaggerOptions } from "./swaggerOptions";
// import authenticationMiddleware from "./middleware/authentication";

async function createServer(): Promise<ApplicationServer> {
	const app = express()

	// Middlewares
	app.use(express.json()) // To parse the incoming requests with JSON payloads

	// TODO: build a jwt verification middleware (or find a package) -- this will be in one level higher -- gateway
	// // Authentication
	// app.use('/api/*', authenticationMiddleware)

	// Logger
	if (process.env.NODE_ENV !== "TEST") {
		app.use(loggerMiddleware)
	}

	// CORS allowed origin and headers
	app.use(cors())
	// app.use((_, res, next) => {
	//   res.header("Access-Control-Allow-Origin", "*");
	//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	//   res.header(
	//     "Access-Control-Allow-Headers",
	//     "Origin, X-Requested-With, Content-Type, Accept"
	//   );
	//   next();
	// });

	// Compression
	app.use(compression())

	// Routing
	app.use("/api/v0/athletes", athleteRouter)
	app.use("/api/v0/notifications", notificationRouter)

	const httpServer = http.createServer(app)

	// // Swagger docs

	// app.get('/api-docs/swagger.json', (_, res) => res.json(swaggerDocument))
	// app.use(
	//   '/api-docs',
	//   swaggerUi.serveFiles(undefined, swaggerOptions),
	//   swaggerUi.setup(undefined, swaggerOptions)
	// )

	return {
		app: httpServer,
		dbClient: new PrismaClient()
	}
}

export default createServer
