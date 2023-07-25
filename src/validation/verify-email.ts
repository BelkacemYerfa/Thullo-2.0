import { z } from "zod";

export const VerifyEmailSchema = z.object({
  email: z.string().email(),
});

export type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema>;

export const AccountConfirmation = z.object({
  code: z.string().min(6).max(6),
});

export type AccountConfirmationType = z.infer<typeof AccountConfirmation>;
