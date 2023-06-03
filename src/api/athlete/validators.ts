import { z } from "zod";

export const athleteSearchSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
});

export type AthleteSearchSchema = z.infer<typeof athleteSearchSchema>;
