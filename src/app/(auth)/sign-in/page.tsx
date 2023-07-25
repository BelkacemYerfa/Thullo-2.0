import { OAuthSignIn } from "@/components/auth/OAuthSignIn";
import { SignInForm } from "@/components/forms/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Card className="rounded-xl w-full sm:w-3/4 md:max-w-lg ">
      <CardHeader>
        <CardTitle className="text-2xl"> Sign In</CardTitle>
        <CardDescription>Sign In Page</CardDescription>
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
        <SignInForm />
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm ">
          <span className="mr-1 hidden sm:inline-block">
            Don&apos;t have an account?
          </span>
          <Link
            aria-label="Sign up"
            href="/sign-up"
            className="underline-offset-4 text-[#2F80ED] transition-colors hover:underline"
          >
            Sign up
          </Link>
        </div>
        <Link
          aria-label="Reset password"
          href="/sign-in/reset-password"
          className="text-sm text-[#EB5757] underline-offset-4 transition-colors hover:underline  "
        >
          Reset password
        </Link>
      </CardFooter>
    </Card>
  );
}
