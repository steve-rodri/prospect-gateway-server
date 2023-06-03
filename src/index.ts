import createServer from "./createServer"
import { ApplicationServer } from "./types"

const port = process.env.PORT ?? 5000

createServer().then((appServer: ApplicationServer) => {
	appServer.app.listen(port, () => {
		console.info(`Server is running on: http://localhost:${port}/`)
		// console.info(`API docs: http://localhost:${config.port}/api-docs`)
		// console.info(`GraphQL Server: http://localhost:${config.port}/graphql`)
	})
})

// import { faker } from "@faker-js/faker"

// const ordinal = (n: number) => {
// 	const s = ["th", "st", "nd", "rd"]
// 	const v = n % 100
// 	return n + (s[(v - 20) % 10] || s[v] || s[0])
// }

// const randomNum = (min: number, max: number) =>
// 	Math.floor(Math.random() * (max - min + 1)) + min

// const positions = ["C", "PG", "SG", "PF", "SF"]
// const icpTypes = [
// 	"Role Player",
// 	"All Star",
// 	"Starter",
// 	"Generational",
// 	"Superstar",
// 	"Star"
// ]

// const investmentTypes = ["Single Stock", "Bundle Stock"]

// export const genFakePlayerData = () => ({
// 	id: faker.number,
// 	name: faker.person.fullName(),
// 	age: randomNum(18, 45),
// 	photoUri: faker.image.avatar(),
// 	position: positions[Math.floor(Math.random() * (positions.length - 1))],
// 	team: faker.word.noun({ length: 3 }).toUpperCase(),
// 	draftPick: `${ordinal(parseInt(faker.string.numeric(2), 10))} pick`,
// 	stats: {
// 		pts: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
// 		reb: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
// 		ast: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
// 		stl: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
// 		blk: faker.number.float({ min: 10, max: 100, precision: 0.1 }),
// 		tov: faker.number.float({ min: 10, max: 100, precision: 0.1 })
// 	},
// 	stock: genFakeStockData()
// })

// export const genFakeStockData = () => ({
// 	ipo: parseFloat(faker.finance.amount(5, 1000, 2)),
// 	icp: icpTypes[Math.floor(Math.random() * (icpTypes.length - 1))],
// 	price: parseFloat(faker.finance.amount(5, 100, 2)),
// 	pctChange: parseFloat(faker.finance.amount(-100, 100, 2))
// })

// export const genFakeInvestmentData = () => ({
// 	type: investmentTypes[
// 		Math.floor(Math.random() * (investmentTypes.length - 1))
// 	],
// 	shares: randomNum(1, 200),
// 	sharePrice: parseFloat(faker.finance.amount(5, 100, 2)),
// 	purchaseTimestamp: faker.date.recent(),
// 	profitOrLoss: parseFloat(faker.finance.amount(-10000, 10000, 2))
// })

// export type FakePlayerData = ReturnType<typeof genFakePlayerData>
// export type FakeStockData = ReturnType<typeof genFakeStockData>
// export type FakeInvestmentData = ReturnType<typeof genFakeInvestmentData>
