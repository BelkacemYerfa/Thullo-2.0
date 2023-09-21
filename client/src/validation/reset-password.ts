import { z } from "zod";

export const ResetPasswordSchema = z.object({
  password: z.string().min(8).max(100),
  confirm_password: z.string().min(8).max(100),
  code: z.string().min(6).max(6),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
