import { verifyUserAuth } from "@/app/_actions/board";
import { BoardDashboard } from "@/components/BoardDashboard";
import { NavBar } from "@/components/navigation/Navbar";
import { BoardSettings } from "@/components/settings/BoardSettings";
import client from "@/lib/prismaDb";
import { redirect } from "next/navigation";

type BoardPageProps = {
  params: {
    boardId: string;
  };
};

export async function generateMetadata({
  params: { boardId },
}: BoardPageProps) {
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
      description: true,
    },
  });
  if (!board) redirect("/");
  return {
    title: `${board.name}`,
    description: ` ${boardId} , description: ${board.description}`,
  };
}

export default async function BoardPage({
  params: { boardId },
}: BoardPageProps) {
  const user = await verifyUserAuth();
  return (
    <main className="h-screen w-full space-y-6 flex flex-col">
      <section className="w-full space-y-5">
        <NavBar user={user} boardTitle="DevChallenges" />
        <section className="max-w-[95%] m-auto">
          <BoardSettings />
        </section>
      </section>
      <BoardDashboard boardId={boardId} />
    </main>
  );
}
