import { faker } from "@faker-js/faker"
import {
	User,
	PrismaClient,
	CompetitionType,
	Athlete,
	Prisma
} from "@prisma/client"

import { randomNum } from "../utils/number-utils"
import { getTwoRandomUsers } from "../utils/getTwoRandomUsers"

const genFakeCompetition = (
	competitionTypeId: string,
	users: User[],
	athletes: Athlete[]
): Prisma.CompetitionCreateInput => ({
	startTime: faker.date.past(),
	endTime: [null, faker.date.past()][Math.round(Math.random())],
	competitionType: {
		connect: {
			id: competitionTypeId
		}
	},
	athletes: {
		createMany: {
			data: users
				.map(user => {
					return athletes.map(athlete => ({
						userId: user.id,
						athleteId: athlete.id
					}))
				})
				.flat()
		}
	}
})

export const seedCompetitions = async ({
	amount = 15,
	prisma,
	competitionTypes,
	users,
	athletes
}: {
	amount?: number
	prisma: PrismaClient
	competitionTypes: CompetitionType[]
	users: User[]
	athletes: Athlete[]
}) => {
	const competitions = await Promise.all(
		Array.from({ length: amount }, async () => {
			const randomUsers = getTwoRandomUsers(users)

			const randomCompetitionType = competitionTypes.at(
				randomNum(0, competitionTypes.length - 1)
			) as CompetitionType

			// gets a random number of athletes between 0-6
			const randomAthletes = [...athletes]
				.sort(() => 0.5 - Math.random())
				.slice(0, randomNum(0, 6))

			return prisma.competition.create({
				data: genFakeCompetition(
					randomCompetitionType.id,
					randomUsers,
					randomAthletes
				)
			})
		})
	)
	console.log(`Seeded ${competitions.length} competitions`)
	return competitions
}
