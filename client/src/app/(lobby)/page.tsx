import { AddBoardPopOver } from "@/components/Popups/AddBoardPopOver";
import { BoardCard } from "@/components/card/BoardCard";
import { NavBar } from "@/components/navigation/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import client from "@/lib/prismaDb";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Key, Suspense } from "react";

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
    select: {
      id: true,
      name: true,
      image: {
        select: {
          fileUrl: true,
        },
      },
    },
  });
  return (
    <main className="h-screen w-full flex flex-col">
      <NavBar user={user} />
      <ScrollArea className="h-full w-full">
        <section className="flex-1 max-w-[90%] sm:max-w-[80%] mx-auto pt-10 space-y-7 ">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-[#333333] font-medium text-lg">All Boards</h2>
            <AddBoardPopOver />
          </div>
          <ul className="flex w-full flex-col items-center justify-center overflow-y-auto p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 pb-5 overflow-hidden ">
            {userBoards.length !== 0 ? (
              userBoards.map(
                (board: {
                  id: Key;
                  image: { fileUrl: string }[];
                  name: string;
                }) => (
                  <li key={board.id} className="col-span-1 w-full max-w-sm">
                    <BoardCard
                      boardBanner={board.image?.[0].fileUrl}
                      title={board.name}
                      usersPics={[user.imageUrl]}
                      boardId={board.id as string}
                    />
                  </li>
                )
              )
            ) : (
              <li>
                You have no boards yet. Create one by clicking the plus icon
              </li>
            )}
          </ul>
        </section>
      </ScrollArea>
    </main>
  );
}
