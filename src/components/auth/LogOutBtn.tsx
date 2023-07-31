"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";

export const LogOutBtn = () => {
  const router = useRouter();
  return (
    <SignOutButton
      signOutCallback={() => {
        router.push(`/sign-in`);
      }}
    >
      <Button
        aria-label="Log out"
        size="sm"
        className="w-full flex items-center gap-x-[10px] px-3 py-[10px] rounded-lg justify-start text-sm bg-transparent hover:bg-[#EB5757] text-[#EB5757] hover:text-white font-medium "
      >
        <Icons.LogOut className="h-4 w-4" />
        Log Out
      </Button>
    </SignOutButton>
  );
};
