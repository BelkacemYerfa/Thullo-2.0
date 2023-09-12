import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
