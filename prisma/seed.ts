import { PrismaClient } from "@prisma/client"
import { seedAthletes } from "./seeds/athlete"
import { seedCompetitions, seedNotifications, seedUsers } from "./seeds"
import { seedCompetitionTypes } from "./seeds/competitionType"

const prisma = new PrismaClient()

const seedDatabase = async () => {
	const athletes = await seedAthletes({ prisma })
	const users = await seedUsers({ prisma, athletes })
	await seedNotifications({ prisma, users })
	const competitionTypes = await seedCompetitionTypes({ prisma })
	await seedCompetitions({ prisma, competitionTypes, users, athletes })
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
