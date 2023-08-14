import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = async ({ children }: ProviderProps) => {
  const user = await currentUser();
  if (typeof window !== "undefined") {
    if (user?.id && window.location.pathname.includes("/sign")) {
      redirect(window.location.origin);
    }
  }
  return <>{children}</>;
};
