import { ControllerMethod } from "../../types";
import { Athlete, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const find: ControllerMethod<Athlete[], void> = async () => {
  const athletes = await prisma.athlete.findMany();
  return athletes;
};
