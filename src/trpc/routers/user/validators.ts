import { z } from "zod"

// id                    Int            @id @default(autoincrement())
// username              String         @db.VarChar(50)
// email                 String         @unique
// password              String         @db.VarChar(200)
// walletBalance         Decimal        @db.Money
// holdings              Holding[]
// competitionUserOne    Competition[]  @relation(name: "competitionUserOne")
// competitionUserTwo    Competition[]  @relation(name: "competitionUserTwo")
// notificationSender    Notification[] @relation(name: "notificationSender")
// notificationRecipient Notification[] @relation(name: "notificationRecipient")
// createdAt             DateTime       @default(now())
// updatedAt             DateTime       @updatedAt

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
	id: z.number(),
	email: z.string().email(),
	walletBalance: z.number()
	// holdings: z.array(holdingSchema)
})

export type UserCreateSchema = z.infer<typeof userCreateSchema>
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
