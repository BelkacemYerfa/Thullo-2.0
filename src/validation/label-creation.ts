import { z } from "zod";

export const labelCreationSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string(),
});

export type labelCreationSchemaType = z.infer<typeof labelCreationSchema>;
