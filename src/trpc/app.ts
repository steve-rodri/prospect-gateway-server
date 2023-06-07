import { router } from "./init"
import { userRouter, athleteRouter, notificationRouter } from "./routers"

export const appRouter = router({
	user: userRouter,
	athlete: athleteRouter,
	notification: notificationRouter
})

export type AppRouter = typeof appRouter
