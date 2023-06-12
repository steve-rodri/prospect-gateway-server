import { z } from "zod"

export const holdingSchema = z.object({
	id: z.number(),
	athleteId: z.number(),
	shareAmt: z.number(),
	purchaseDate: z.string().datetime()
})

export const userUpdateSchema = z.object({
	id: z.string(),
	walletBalance: z.number().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
	dateOfBirth: z.string().optional()
	// holdings: z.array(holdingSchema)
})

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
