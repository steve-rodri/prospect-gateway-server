import { PrismaClient } from "@prisma/client"

import {
	seedAthletes,
	seedCompetitions,
	seedCompetitionTypes,
	seedNotifications,
	seedUsers
} from "./seeds"

const prisma = new PrismaClient()

const seedDatabase = async () => {
	const athletes = await seedAthletes({ min: 20, max: 100, prisma })
	const users = await seedUsers({ amount: 30, prisma, athletes })
	const competitionTypes = await seedCompetitionTypes({ amount: 5, prisma })
	await seedNotifications({ amount: 20, prisma, users })
	await seedCompetitions({
		amount: 10,
		prisma,
		competitionTypes,
		users,
		athletes
	})
}

seedDatabase()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
