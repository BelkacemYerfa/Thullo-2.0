"use client";

import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "@/components/Icons";
import { useState } from "react";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" },
] satisfies {
  name: string;
  strategy: OAuthStrategy;
  icon: keyof typeof Icons;
}[];

export const OAuthSignIn = () => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoading, setIsLoading] = useState<string>("");
  const oauthSignIn = async (provider: OAuthStrategy) => {
    try {
      setIsLoading(provider);
      await signIn?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      setIsLoading("");
      isClerkAPIResponseError(error)
        ? toast.error(error.message ?? "Something went wrong")
        : toast("Something went wrong");
      alert(error ?? "Something went wrong");
    }
  };

  return (
    <div className="grid grid-col-1 sm:grid-cols-3 gap-2">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];
        return (
          <Button
            key={provider.strategy}
            disabled={!isLoaded}
            variant={"outline"}
            className="flex items-center gap-x-2 rounded-lg text-black "
            onClick={() => oauthSignIn(provider.strategy)}
          >
            {isLoading !== provider.strategy ? (
              <Icon className="h-5 w-5" />
            ) : (
              <Icons.Loader2 className="h-5 w-5 animate-spin" />
            )}
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
};
