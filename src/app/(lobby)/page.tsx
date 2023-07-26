import { NavBar } from "@/components/navigation/Navbar";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="min-h-screen gap-x-2 p-1 w-full">
      <NavBar user={user} boardTitle="DeveChallenges Board" />
      <hr />
    </main>
  );
}
