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
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  AccountConfirmation,
  AccountConfirmationType,
} from "@/validation/verify-email";
import { Icons } from "../Icons";

export const VerifyCodeForm = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<AccountConfirmationType>({
    resolver: zodResolver(AccountConfirmation),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = (data: AccountConfirmationType) => {
    if (!isLoaded) return;
    setIsPending(async () => {
      const { code } = data;
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: code,
        });
        if (completeSignUp?.status !== "complete") {
          /*  investigate the response, to see if there was an error
             or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId });
          router.push(`${window.location.origin}/`);
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
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
          Create Account
        </Button>
      </form>
    </Form>
  );
};
