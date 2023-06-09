import { z } from "zod"

export const competitionCreateSchema = z.object({
	competitionTypeId: z.string()
})

export const competitionUpdateSchema = z.object({
	id: z.string(),
	endTime: z.string()
})

export type CompetitionCreateSchema = z.infer<typeof competitionCreateSchema>
export type CompetitionUpdateSchema = z.infer<typeof competitionUpdateSchema>
