import { z } from "zod"

export const holdingSchema = z.object({
	id: z.number(),
	athleteId: z.number(),
	shareAmt: z.number(),
	purchaseDate: z.string().datetime()
})

export const userCreateSchema = z.object({
	email: z.string().email()
})

export const userUpdateSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	walletBalance: z.number()
	// holdings: z.array(holdingSchema)
})

export type UserCreateSchema = z.infer<typeof userCreateSchema>
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
