import { faker } from "@faker-js/faker"
import { Prisma, User, Holding, PrismaClient, Athlete } from "@prisma/client"
import { randomNum } from "../utils/number-utils"

const genFakeUser = (): Omit<User, "id" | "createdAt" | "updatedAt"> => ({
	username: faker.internet.userName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	walletBalance: new Prisma.Decimal(faker.finance.amount())
})

const genFakeHolding = (
	userId: number,
	athleteId: number
): Omit<Holding, "id" | "createdAt" | "updatedAt"> => ({
	userId,
	athleteId,
	shareAmt: randomNum(1, 200),
	purchaseDate: faker.date.recent()
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

// const investmentTypes = ["Single Stock", "Bundle Stock"]
// export const genFakeInvestmentData = () => ({
// 	type: investmentTypes[
// 		Math.floor(Math.random() * (investmentTypes.length - 1))
// 	],
// 	shares: randomNum(1, 200),
// 	sharePrice: parseFloat(faker.finance.amount(5, 100, 2)),
// 	purchaseTimestamp: faker.date.recent(),
// 	profitOrLoss: parseFloat(faker.finance.amount(-10000, 10000, 2))
// })
