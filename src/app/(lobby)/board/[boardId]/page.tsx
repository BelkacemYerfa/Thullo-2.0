import { NavBar } from "@/components/navigation/Navbar";
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
    <main className="min-h-screen w-full">
      <NavBar user={user} boardTitle="DevChallenges" />
      <section className="">
        <h1>Board {boardId}</h1>
      </section>
    </main>
  );
}
