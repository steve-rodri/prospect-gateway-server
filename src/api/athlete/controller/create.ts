import { Athlete } from "@prisma/client"
import axios from "axios"

import { AthleteSearchSchema } from "../validators"
import { ControllerMethod } from "../../types"
import { Context } from "../../../trpc"

const NBA_API_BASE = process.env.NBA_API_BASE

type Create = ControllerMethod<
	Athlete,
	{ input: AthleteSearchSchema; ctx: Context }
>

export const create: Create = async ({ input, ctx }) => {
	const { prisma } = ctx
	const { firstName, lastName, suffix } = input

	const athleteData = await axios.get(
		`${NBA_API_BASE}/athleteid?first=${firstName}&last=${lastName}&suffix=${suffix}`
	)

	const found = await prisma.athlete.findFirst({
		where: { id: athleteData.data.id }
	})

	if (found) {
		return found
		// TODO: use last updated to determine if should fetch from nba_api and update data
		// const getLastUpdatedQuery = dbc('athletes').select('last_updated').where('id', '=', athleteId);
		// const lastUpdated = await getLastUpdatedQuery;
		// if lastUpdated was 24+hrs ago, re-fetch
	}

	// athlete is not currently in the database
	if (!found) {
		const profile = await axios.get(
			`${NBA_API_BASE}/profile?first=${firstName}&last=${lastName}&suffix=${suffix}`
		)

		const { career_averages, ...profileData } = profile.data

		return prisma.athlete.create({
			data: {
				...profileData,
				...career_averages
			}
		})
	}
}
