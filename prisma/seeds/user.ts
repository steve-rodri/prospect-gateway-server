import { faker } from "@faker-js/faker"
import { Prisma, PrismaClient, Athlete } from "@prisma/client"
import { randomNum } from "../utils/number-utils"

const genFakeUser = (): Prisma.UserCreateInput => ({
	email: faker.internet.email(),
	walletBalance: new Prisma.Decimal(faker.finance.amount())
})

// TODO: Add type and sharePrice to schema for holdings, calculate profitOrLoss in trpc procedure

const genFakeHolding = (
	userId: string,
	athleteId: string
): Prisma.HoldingCreateInput => ({
	user: {
		connect: {
			id: userId
		}
	},
	athlete: {
		connect: {
			id: athleteId
		}
	},
	// type: ["Single Stock", "Bundle Stock"],
	// type: investmentTypes[Math.floor(Math.random() * (investmentTypes.length - 1 ))]
	shareAmt: randomNum(1, 200),
	purchaseDate: faker.date.recent()
	// sharePrice:
	// profitOrLoss:
})

export const seedUsers = async ({
	amount = 30,
	athletes,
	prisma
}: {
	amount?: number
	athletes: Athlete[]
	prisma: PrismaClient
}) => {
	const users = await Promise.all(
		Array.from({ length: amount }, async () => {
			const user = await prisma.user.create({ data: genFakeUser() })
			await Promise.all(
				Array.from({ length: randomNum(1, 10) }, async () => {
					const randomAthlete = athletes.at(randomNum(0, athletes.length - 1))
					if (randomAthlete)
						await prisma.holding.create({
							data: genFakeHolding(user.id, randomAthlete.id)
						})
				})
			)
			return user
		})
	)
	console.log(`Seeded ${users.length} users `)
	return users
}
