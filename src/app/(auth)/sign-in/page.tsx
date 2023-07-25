import { OAuthSignIn } from "@/components/auth/OAuthSignIn";
import { SignInForm } from "@/components/forms/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center min-h-screen">
      <OAuthSignIn />
      <SignInForm />
    </div>
  );
}
