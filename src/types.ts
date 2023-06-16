import { PrismaClient } from "@prisma/client"
import { Server } from "http"

export interface ApplicationServer {
	app: Server
	prisma: PrismaClient
}
