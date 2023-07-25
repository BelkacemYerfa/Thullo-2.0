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
import { SignUpSchemaType, SignUpSchema } from "@/validation/auth-sign-up";
import { Button } from "../ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignUpForm = () => {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const onSubmit = async (data: SignUpSchemaType) => {
    const { email, password } = data;
    try {
      await signUp?.create({
        emailAddress: email,
        password: password,
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      /* router.push("/signup/verify-email"); */
      toast.message("Check your email", {
        description: "We sent you a 6-digit verification code.",
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Form {...form}>
      <form className="" onSubmit={() => form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ex@exe.com" {...field} />
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
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
};
