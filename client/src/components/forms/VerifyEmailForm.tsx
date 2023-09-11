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
  VerifyEmailSchema,
  VerifyEmailSchemaType,
} from "../../validation/verify-email";
import { Icons } from "@/components/Icons";

export const VerifyEmailForm = () => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<VerifyEmailSchemaType>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: VerifyEmailSchemaType) => {
    if (!isLoaded) return;
    setIsPending(async () => {
      const { email } = data;
      try {
        const result = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email,
        });

        if (result.status === "needs_first_factor") {
          router.push("/sign-in/verify-email/step-2");
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          });
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-lg"
                  placeholder="ex@exe.com"
                  {...field}
                />
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
          Send Code
        </Button>
      </form>
    </Form>
  );
};
