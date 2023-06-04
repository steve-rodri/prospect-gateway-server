import { faker } from "@faker-js/faker"
import {
	Competition,
	User,
	PrismaClient,
	CompetitionType,
	Athlete
} from "@prisma/client"

import { randomNum } from "../utils/number-utils"
import { getTwoRandomUsers } from "../utils/getTwoRandomUsers"

// TODO: Determine how to handle result when competition ends

const genFakeCompetition = (
	competitionTypeId: number,
	userOneId: number,
	userTwoId: number
): Omit<Competition, "id" | "createdAt" | "updatedAt"> => ({
	competitionTypeId,
	userOneId,
	userTwoId,
	active: [true, false][Math.round(Math.random())],
	startTime: faker.date.past(),
	endTime: [null, faker.date.past()][Math.round(Math.random())]
})

export const seedCompetitions = async ({
	amount = 5,
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
			const randomCompetitionType = competitionTypes.at(
				randomNum(0, competitionTypes.length - 1)
			)
			const randomUsers = getTwoRandomUsers(users)
			if (!randomCompetitionType) return
			if (!randomUsers.one) return
			if (!randomUsers.two) return
			return prisma.competition.create({
				data: genFakeCompetition(
					randomCompetitionType.id,
					randomUsers.one.id,
					randomUsers.two.id
				)
			})
		})
	)

	// TODO: Figure out how to associate a user's athletes to a competition
	// associate athletes with competitions
	await Promise.all(
		competitions.map(competition => {
			// await prisma.athleteCompetition.create({ })
		})
	)
	console.log(`Seeded ${competitions.length} competitions`)
	return competitions
}
