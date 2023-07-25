"use client";

import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google" },
  { name: "Facebook", strategy: "oauth_facebook" },
  { name: "Discord", strategy: "oauth_discord" },
] satisfies {
  name: string;
  strategy: OAuthStrategy;
}[];

export const OAuthSignIn = () => {
  const { signIn, isLoaded } = useSignIn();
  const oauthSignIn = async (provider: OAuthStrategy) => {
    try {
      const result = await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
      console.log(result);
    } catch (error) {
      isClerkAPIResponseError(error)
        ? toast.error(error.message ?? "Something went wrong")
        : toast("Something went wrong");
      alert(error ?? "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-x-2">
      {oauthProviders.map((provider) => (
        <Button
          key={provider.strategy}
          disabled={!isLoaded}
          variant={"outline"}
          onClick={() => oauthSignIn(provider.strategy)}
        >
          {provider.name}
        </Button>
      ))}
    </div>
  );
};
