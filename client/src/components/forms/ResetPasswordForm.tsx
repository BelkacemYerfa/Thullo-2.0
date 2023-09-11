"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "../../validation/reset-password";
import { Icons } from "@/components/Icons";
import { PasswordInput } from "@/components/PasswordInput";

export const ResetPasswordForm = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      code: "",
    },
  });
  const onSubmit = (data: ResetPasswordSchemaType) => {
    if (!isLoaded) return;
    setIsPending(async () => {
      const { password, code } = data;
      try {
        const attemptFirstFactor = await signIn.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: code,
          password: password,
        });

        if (attemptFirstFactor.status === "complete") {
          await setActive({
            session: attemptFirstFactor.createdSessionId,
          });
          router.push(`${window.location.origin}/`);
          toast.success("Password reset successfully.");
        } else {
          console.error(attemptFirstFactor);
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="rounded-lg"
                  placeholder="*******"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  className="rounded-lg"
                  placeholder="*******"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>code</FormLabel>
              <FormControl>
                <Input className="rounded-lg" placeholder="123456" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-lg bg-[#2F80ED] disabled:cursor-not-allowed hover:bg-[#2F80ED] flex items-center gap-x-2 "
          disabled={isPending || !form.formState.isValid}
        >
          {isPending && (
            <Icons.Loader2
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          )}
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
