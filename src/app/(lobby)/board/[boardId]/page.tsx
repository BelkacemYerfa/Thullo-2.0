import { NavBar } from "@/components/navigation/Navbar";
import { currentUser } from "@clerk/nextjs";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage({
  params: { boardId },
}: BoardPageProps) {
  const user = await currentUser();
  return (
    <main>
      <NavBar user={user} boardTitle="DevChallenges" />
    </main>
  );
}
