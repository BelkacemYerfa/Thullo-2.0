import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1).max(255),
});

export type searchSchemaType = z.infer<typeof searchSchema>;

export const BoardFormSchema = z.object({
  img: z.any().optional(),
  title: z.string().min(1).max(100),
});

export type BoardFormSchemaType = z.infer<typeof BoardFormSchema>;
