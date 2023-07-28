"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const { userId } = useAuth();
  const pathname = usePathname();
  if (userId && pathname.includes("/sign")) {
    if (typeof window !== "undefined") {
      redirect(window.location.origin);
    }
  }
  return <>{children}</>;
};
