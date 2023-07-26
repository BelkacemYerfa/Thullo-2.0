import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1).max(255),
});

export type searchSchemaType = z.infer<typeof searchSchema>;
