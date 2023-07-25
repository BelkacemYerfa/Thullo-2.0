import { VerifyEmailForm } from "@/components/forms/VerifyEmailForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyEmailForm />
      </CardContent>
    </Card>
  );
}
