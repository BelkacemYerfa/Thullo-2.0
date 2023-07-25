import { OAuthSignIn } from "@/components/auth/OAuthSignIn";
import { SignUpForm } from "@/components/forms/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Card className="rounded-xl w-full sm:w-3/4 md:max-w-lg ">
      <CardHeader>
        <CardTitle className="text-2xl"> Sign Up </CardTitle>
        <CardDescription>Sign Up Page</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <OAuthSignIn />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <SignUpForm />
      </CardContent>
      <CardFooter className=" text-sm ">
        <span className="mr-1 hidden sm:inline-block">
          Already have an account?
        </span>
        <Link
          aria-label="Sign in"
          href="/sign-in"
          className="underline-offset-4 text-[#2F80ED] transition-colors hover:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
