"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const { userId } = useAuth();
  if (typeof window !== "undefined") {
    if (userId && window.location.pathname.includes("/sign")) {
      redirect(window.location.origin);
    }
  }
  return <>{children}</>;
};
