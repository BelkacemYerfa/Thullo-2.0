"use client";

import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Icons } from "../Icons";

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Facebook", strategy: "oauth_facebook", icon: "facebook" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
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
    <div className="grid grid-col-1 sm:grid-cols-3 gap-2">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon];
        return (
          <Button
            key={provider.strategy}
            disabled={!isLoaded}
            variant={"outline"}
            className="flex items-center gap-x-1 rounded-lg text-black "
            onClick={() => oauthSignIn(provider.strategy)}
          >
            <Icon className="w-5 h-5" />
            {provider.name}
          </Button>
        );
      })}
    </div>
  );
};
