import { AddBoardPopOver } from "@/components/Popups/AddBoardPopOver";
import { BoardCard } from "@/components/card/BoardCard";
import { NavBar } from "@/components/navigation/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import client from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userBoards = await client.board.findMany({
    where: {
      user: user.id,
    },
    include: {
      image: true,
    },
  });
  return (
    <main className="min-h-screen w-full flex flex-col">
      <NavBar user={user} />
      <ScrollArea className="h-full w-full">
        <section className="flex-1 max-w-[80%] m-auto pt-10 space-y-7 ">
          <div className="w-full flex items-center justify-between px-2">
            <h2 className="text-[#333333] font-medium text-lg">All Boards</h2>
            <AddBoardPopOver />
          </div>
          <div className="flex items-center justify-center w-full flex-wrap gap-x-8 gap-y-7 pb-5">
            <Suspense fallback={<p>Loading</p>}>
              {userBoards.map((board) => {
                return (
                  <BoardCard
                    key={board.id}
                    boardBanner={board.image?.[0].fileUrl}
                    title={board.name}
                    usersPics={[user.imageUrl]}
                    boardId={board.id}
                  />
                );
              })}
            </Suspense>
          </div>
        </section>
      </ScrollArea>
    </main>
  );
}
