import { z } from "zod";

export const boardDescriptionSchema = z.object({
  description: z.string().min(1).max(1000).optional(),
});

export type boardDescriptionSchemaType = z.infer<typeof boardDescriptionSchema>;
