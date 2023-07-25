import { OAuthSignIn } from "@/components/auth/OAuthSignIn";
import { SignUpForm } from "@/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center min-h-screen">
      <OAuthSignIn />
      <SignUpForm />
    </div>
  );
}
