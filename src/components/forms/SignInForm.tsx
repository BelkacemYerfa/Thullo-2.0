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
import { SignInSchemaType, SignInSchema } from "@/validation/auth-sign-in";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useTransition } from "react";
import { toast } from "sonner";

export const SignInForm = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });
  const onSubmit = (data: SignInSchemaType) => {
    setIsPending(async () => {
      try {
        const result = await signIn?.create({
          identifier: data.email,
          password: data.password,
        });
        if (result?.status === "complete") {
          setActive!({ session: result?.createdSessionId });
          router.push("/");
          toast.success("Welcome back");
        } else {
          console.log(result);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
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
          className="rounded-lg bg-[#2F80ED] disabled:cursor-not-allowed "
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};
