import { Prisma, PrismaClient } from "@prisma/client"

import { randomNum } from "../utils/number-utils"
import { faker } from "@faker-js/faker"

const genFakeCompetitionType = (): Prisma.CompetitionTypeCreateInput => ({
	name: faker.word.words({ count: { min: 1, max: 2 } }),
	athleteLimit: randomNum(1, 5),
	moneyLimit: new Prisma.Decimal(faker.finance.amount()),
	durationInDays: randomNum(3, 14)
})

export const seedCompetitionTypes = async ({
	amount = 5,
	prisma
}: {
	amount?: number
	prisma: PrismaClient
}) => {
	const competitionTypes = await Promise.all(
		Array.from({ length: amount }, async () => {
			return prisma.competitionType.create({
				data: genFakeCompetitionType()
			})
		})
	)

	console.log(`Seeded ${competitionTypes.length} competition types`)
	return competitionTypes
}
