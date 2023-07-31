import { z } from "zod";

export const listNameSchema = z.object({
  name: z.string().min(1).max(20),
});

export type listNameSchemaType = z.infer<typeof listNameSchema>;
