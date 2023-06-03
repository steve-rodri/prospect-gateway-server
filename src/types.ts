import { Server } from "http";
import { PrismaClient } from "@prisma/client";

export interface ApplicationServer {
  app: Server;
  dbClient: PrismaClient;
}
