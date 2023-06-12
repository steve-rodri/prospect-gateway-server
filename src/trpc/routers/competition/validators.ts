import { z } from "zod"

export const competitionCreateSchema = z.object({
	competitionTypeId: z
		.string()
		.describe("The id of the related competition type"),
	athletes: z
		.array(
			z.object({
				userId: z.string(),
				athleteId: z.string()
			})
		)
		.describe("An array of objects containing user and athlete ids")
})

export const competitionUpdateSchema = z.object({
	id: z.string(),
	endTime: z.string()
})

export type CompetitionCreateSchema = z.infer<typeof competitionCreateSchema>
export type CompetitionUpdateSchema = z.infer<typeof competitionUpdateSchema>
