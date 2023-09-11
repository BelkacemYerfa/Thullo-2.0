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
import { SignUpSchemaType, SignUpSchema } from "../../validation/auth-sign-up";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Icons } from "@/components/Icons";
import { PasswordInput } from "@/components/PasswordInput";

export const SignUpForm = () => {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignUpSchemaType) => {
    if (!isLoaded) return;
    startTransition(async () => {
      const { email, password } = data;
      try {
        await signUp.create({
          emailAddress: email,
          password,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        router.push("/sign-up/verify-code");
        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        });
      } catch (error) {
        toast.error("Something went wrong , try again later");
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
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
