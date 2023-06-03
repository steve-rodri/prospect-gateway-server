import {
	Athlete,
	AthleteStatistics,
	PrismaClient,
	Prisma,
	AthleteStock,
	StockPrice,
	User,
	AthleteStockICP,
	Holding,
	Notification,
	NotificationType,
	NotificationStatus,
	CompetitionType,
	Competition
} from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

const ordinal = (n: number) => {
	const s = ["th", "st", "nd", "rd"]
	const v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const randomNum = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1)) + min

const positions = ["C", "PG", "SG", "PF", "SF"]

export const genFakeAthlete = (): Omit<
	Athlete,
	"id" | "createdAt" | "updatedAt"
> => ({
	name: faker.person.fullName(),
	age: randomNum(18, 45),
	photoUri: faker.image.avatar(),
	position: positions[Math.floor(Math.random() * (positions.length - 1))],
	teamAbbr: faker.word.noun({ length: 3 }).toUpperCase(),
	draftPick: `${ordinal(parseInt(faker.string.numeric(2), 10))} pick`
})

export const genFakeAthleteStatistics = (
	athleteId: number
): AthleteStatistics => ({
	athleteId,
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

const icpTypes = [
	AthleteStockICP.RolePlayer,
	AthleteStockICP.AllStar,
	AthleteStockICP.Starter,
	AthleteStockICP.Generational,
	AthleteStockICP.Superstar,
	AthleteStockICP.Star
]

export const genFakeAthleteStock = (athleteId: number): AthleteStock => ({
	athleteId,
	ipo: new Prisma.Decimal(parseFloat(faker.finance.amount(5, 1000, 2))),
	icp: icpTypes[Math.floor(Math.random() * (icpTypes.length - 1))]
})

export const genFakeStockPrice = (
	athleteId: number
): Omit<StockPrice, "id"> => ({
	athleteId,
	date: faker.date.past(),
	price: new Prisma.Decimal(faker.finance.amount(5, 100, 2))
})

const investmentTypes = ["Single Stock", "Bundle Stock"]

export const genFakeInvestmentData = () => ({
	type: investmentTypes[
		Math.floor(Math.random() * (investmentTypes.length - 1))
	],
	shares: randomNum(1, 200),
	sharePrice: parseFloat(faker.finance.amount(5, 100, 2)),
	purchaseTimestamp: faker.date.recent(),
	profitOrLoss: parseFloat(faker.finance.amount(-10000, 10000, 2))
})

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

const notificationTypes = [
	NotificationType.Competition,
	NotificationType.FriendRequest
]

const notificationStatuses = [
	NotificationStatus.pending,
	NotificationStatus.rejected,
	NotificationStatus.success
]

const genFakeNotification = (
	senderId: number,
	recipientId: number
): Omit<Notification, "id" | "updatedAt"> => ({
	senderId,
	recipientId,
	type: notificationTypes[
		Math.floor(Math.random() * (notificationTypes.length - 1))
	],
	status:
		notificationStatuses[
			Math.floor(Math.random() * (notificationStatuses.length - 1))
		],
	dateSent: faker.date.past()
})

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

const genFakeCompetitionType = (): Omit<
	CompetitionType,
	"id" | "createdAt" | "updatedAt"
> => ({
	name: faker.word.words({ count: { min: 1, max: 2 } }),
	athleteLimit: randomNum(1, 5),
	moneyLimit: new Prisma.Decimal(faker.finance.amount()),
	durationInDays: randomNum(3, 14)
})

const getTwoRandomUsers = (users: User[]) => {
	const one = users.at(randomNum(0, users.length - 1))
	const two = (() => {
		let selected = users.at(randomNum(0, users.length - 1))
		if (!one) return
		if (!selected) return
		while (selected.id === one.id) {
			const newSelect = users.at(randomNum(0, users.length - 1))
			if (newSelect) selected = newSelect
		}
		return selected
	})()
	return { one, two }
}

async function main() {
	const athletes = await Promise.all(
		Array.from({ length: randomNum(20, 100) }, async () => {
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

	const users = await Promise.all(
		Array.from({ length: 30 }, async () => {
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

	// notifications
	await Promise.all(
		Array.from({ length: 20 }, async () => {
			const randomUsers = getTwoRandomUsers(users)
			if (!randomUsers.one) return
			if (!randomUsers.two) return
			return prisma.notification.create({
				data: genFakeNotification(randomUsers.one.id, randomUsers.two.id)
			})
		})
	)

	const competitionTypes = await Promise.all(
		Array.from({ length: 5 }, async () => {
			return prisma.competitionType.create({
				data: genFakeCompetitionType()
			})
		})
	)

	//competitions
	const competitions = await Promise.all(
		Array.from({ length: 5 }, async () => {
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
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
