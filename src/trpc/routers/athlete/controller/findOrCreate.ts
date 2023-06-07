import { Athlete } from "@prisma/client"

import { create } from "./create"
import { AthleteSearchSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { AuthContext } from "../../../context"

// set the hour limit until data is considered stale
const HOURS_TO_STALE = 24

type FindOrCreate = ControllerMethod<
	Athlete,
	{ input: AthleteSearchSchema; ctx: AuthContext }
>

export const findOrCreate: FindOrCreate = async ({ input, ctx }) => {
	const { prisma } = ctx
	const { firstName, lastName, suffix } = input

	let fullName = `${firstName} ${lastName}`
	if (suffix) fullName += ` ${suffix}`

	try {
		const athlete = await prisma.athlete.findFirst({
			where: { name: fullName }
		})
		if (athlete) {
			// if athlete found in db, evaluate whether the data is stale
			const timeElapsedSinceUpdate =
				new Date().getTime() - new Date(athlete.updatedAt).getTime()

			// convert timeElapsed (milliseconds) to hours, compare to stale limit
			const shouldRefresh =
				timeElapsedSinceUpdate / (60 * 60 * 1000) >= HOURS_TO_STALE

			// if not stale, simply return
			if (!shouldRefresh) {
				return athlete
			}

			console.log("Data was stale, re-fetching...")
		}

		return create({ input, ctx })
	} catch (e) {
		console.log("error getting one athlete in models: ", e)
	}
}
