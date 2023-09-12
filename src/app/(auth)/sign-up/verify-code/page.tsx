import { VerifyCodeForm } from "@/components/forms/VerifyCodeForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyCodePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirm Account</CardTitle>
        <CardDescription>
          Verify your email address to complete your account creation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyCodeForm />
      </CardContent>
    </Card>
  );
}
