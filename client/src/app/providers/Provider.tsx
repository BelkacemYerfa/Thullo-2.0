"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  const { user } = useUser();

  if (user?.id && window.location.pathname.includes("/sign")) {
    redirect(`/`);
  }
  return <>{children}</>;
};
