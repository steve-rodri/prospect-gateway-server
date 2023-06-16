import { faker } from "@faker-js/faker"
import { AthleteStockICP, Prisma, PrismaClient } from "@prisma/client"

import { ordinal,randomNum } from "../utils/number-utils"

const positions = ["C", "PG", "SG", "PF", "SF"]
const icpTypes = [
	AthleteStockICP.RolePlayer,
	AthleteStockICP.AllStar,
	AthleteStockICP.Starter,
	AthleteStockICP.Generational,
	AthleteStockICP.Superstar,
	AthleteStockICP.Star
]

export const genFakeAthlete = (): Prisma.AthleteCreateInput => ({
	name: faker.person.fullName(),
	age: randomNum(18, 45),
	photoUri: faker.image.avatar(),
	position: positions[Math.floor(Math.random() * (positions.length - 1))],
	teamAbbr: faker.word.noun({ length: 3 }).toUpperCase(),
	draftPick: `${ordinal(parseInt(faker.string.numeric(2), 10))} pick`
})

export const genFakeAthleteStatistics = (
	athleteId: string
): Prisma.AthleteStatisticsCreateInput => ({
	athlete: {
		connect: {
			id: athleteId
		}
	},
	pointAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	),
	reboundAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	),
	assistAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	),
	stealAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	),
	blockAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	),
	turnoverAverage: new Prisma.Decimal(
		faker.number.float({ min: 10, max: 100, precision: 0.1 })
	)
})

export const genFakeAthleteStock = (
	athleteId: string
): Prisma.AthleteStockCreateInput => ({
	athlete: {
		connect: {
			id: athleteId
		}
	},
	ipo: new Prisma.Decimal(parseFloat(faker.finance.amount(5, 1000, 2))),
	icp: icpTypes[Math.floor(Math.random() * (icpTypes.length - 1))]
})

export const genFakeStockPrice = (
	athleteId: string
): Prisma.StockPriceCreateInput => ({
	athleteStock: {
		connect: {
			athleteId
		}
	},
	date: faker.date.past(),
	price: new Prisma.Decimal(faker.finance.amount(5, 100, 2))
})

export const seedAthletes = async ({
	min = 20,
	max = 100,
	prisma
}: {
	min?: number
	max?: number
	prisma: PrismaClient
}) => {
	const athletes = await Promise.all(
		Array.from({ length: randomNum(min, max) }, async () => {
			const athlete = await prisma.athlete.create({ data: genFakeAthlete() })
			await prisma.athleteStatistics.create({
				data: genFakeAthleteStatistics(athlete.id)
			})
			await prisma.athleteStock.create({
				data: genFakeAthleteStock(athlete.id)
			})
			await Promise.all(
				Array.from({ length: 50 }, async () => {
					await prisma.stockPrice.create({
						data: genFakeStockPrice(athlete.id)
					})
				})
			)
			return athlete
		})
	)
	console.log(`Seeded ${athletes.length} athletes`)
	return athletes
}
