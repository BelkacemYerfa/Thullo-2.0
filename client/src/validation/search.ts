import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1).max(255),
});

export type searchSchemaType = z.infer<typeof searchSchema>;

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const BoardFormSchema = z.object({
  title: z.string().min(1).max(100).nonempty(),
});

export type BoardFormSchemaType = z.infer<typeof BoardFormSchema>;
