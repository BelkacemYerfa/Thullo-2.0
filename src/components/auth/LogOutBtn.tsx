"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const LogOutBtn = () => {
  const router = useRouter();
  return (
    <div className="">
      <SignOutButton
        signOutCallback={() => {
          router.push(`/sign-in`);
        }}
      >
        <Button aria-label="Log out" size="sm" className="w-full">
          Log Out
        </Button>
      </SignOutButton>
    </div>
  );
};
