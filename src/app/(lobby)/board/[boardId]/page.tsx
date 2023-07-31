import { BoardDashboard } from "@/components/BoardDashboard";
import { NavBar } from "@/components/navigation/Navbar";
import { BoardSettings } from "@/components/settings/BoardSettings";
import { currentUser } from "@clerk/nextjs";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

export async function getMetadata({ params: { boardId } }: BoardPageProps) {
  return {
    title: `board ${boardId}`,
    description: `board ${boardId} description`,
  };
}

export default async function BoardPage({
  params: { boardId },
}: BoardPageProps) {
  const user = await currentUser();
  return (
    <main className="h-screen w-full space-y-6 flex flex-col">
      <section className="w-full space-y-5">
        <NavBar user={user} boardTitle="DevChallenges" />
        <section className="max-w-[95%] m-auto">
          <BoardSettings />
        </section>
      </section>
      <BoardDashboard />
    </main>
  );
}
