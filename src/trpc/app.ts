import { router } from "./init"
import {
	athleteRouter,
	competitionRouter,
	notificationRouter,
	userRouter
} from "./routers"

export const appRouter = router({
	athlete: athleteRouter,
	competition: competitionRouter,
	notification: notificationRouter,
	user: userRouter
})

export type AppRouter = typeof appRouter
