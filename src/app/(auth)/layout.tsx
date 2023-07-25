interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex flex-col space-y-2 items-center justify-center min-h-screen p-2">
      {children}
    </main>
  );
}
