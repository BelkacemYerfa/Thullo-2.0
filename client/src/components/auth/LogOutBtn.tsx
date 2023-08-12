"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { useTransition, useState, useEffect } from "react";

export const LogOutBtn = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <SignOutButton
      signOutCallback={() =>
        startTransition(() => {
          router.push(`${window.location.origin}?redirect=false `);
        })
      }
    >
      <Button
        aria-label="Log out"
        size="sm"
        className="w-full flex items-center gap-x-[10px] px-3 py-[10px] rounded-lg justify-start text-sm bg-transparent hover:bg-[#EB5757] text-[#EB5757] hover:text-white font-medium "
        disabled={isPending}
      >
        {isPending ? (
          <Icons.Loader2 className="h-4 w-4" />
        ) : (
          <Icons.LogOut className="h-4 w-4" />
        )}
        Log Out
      </Button>
    </SignOutButton>
  );
};
