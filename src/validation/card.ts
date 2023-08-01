import { z } from "zod";

export const cardSchema = z.object({
  name: z.string().min(1).max(100),
});

export type cardSchemaType = z.infer<typeof cardSchema>;
