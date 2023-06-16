import { z } from "zod"

export const athleteFindSchema = z.object({
	search: z
		.string()
		.optional()
		.describe("string to search for an athlete by name")
})

export type AthleteFindSchema = z.infer<typeof athleteFindSchema>
