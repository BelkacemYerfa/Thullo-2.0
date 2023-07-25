"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  VerifyEmailSchema,
  VerifyEmailSchemaType,
} from "@/validation/verify-email";

export const VerifyEmailForm = () => {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<VerifyEmailSchemaType>({
    resolver: zodResolver(VerifyEmailSchema),
  });
  const onSubmit = (data: VerifyEmailSchemaType) => {
    setIsPending(async () => {
      const { email } = data;
      try {
        const result = await signIn?.create({
          strategy: "reset_password_email_code",
          identifier: email,
        });

        if (result?.status === "needs_first_factor") {
          router.push("/sign-in/verify-email/step2");
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
        onSubmit={() => void form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
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
          className="rounded-lg bg-[#2F80ED] disabled:cursor-not-allowed "
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Loading..." : "Send"}
        </Button>
      </form>
    </Form>
  );
};
