import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Thullo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
