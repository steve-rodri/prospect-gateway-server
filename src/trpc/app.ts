import { router } from "./init"
import { athleteRouter, notificationRouter } from "../api"

export const appRouter = router({
	athlete: athleteRouter,
	notification: notificationRouter
})

export type AppRouter = typeof appRouter
