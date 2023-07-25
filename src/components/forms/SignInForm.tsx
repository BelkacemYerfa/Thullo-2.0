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

export const SignInForm = () => {
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });
  const onSubmit = async (data: SignInSchemaType) => {
    const { email, password } = data;
    console.log(data);
  };
  return (
    <Form {...form}>
      <form className="" onSubmit={() => void form.handleSubmit(onSubmit)}>
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
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
};
