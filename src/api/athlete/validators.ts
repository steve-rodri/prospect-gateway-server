import { z } from "zod";

export const athleteCreateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
});

export type AthleteCreateSchema = z.infer<typeof athleteCreateSchema>;
