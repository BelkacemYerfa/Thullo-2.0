import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
