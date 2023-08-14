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
  });
  console.log(userBoards);
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
            {userBoards.length !== 0 ? (
              userBoards.map(
                (board: {
                  id: Key;
                  image: { fileUrl: string }[];
                  name: string;
                }) => {
                  return (
                    <BoardCard
                      key={board.id}
                      boardBanner={board.image?.[0].fileUrl}
                      title={board.name}
                      usersPics={[user.imageUrl]}
                      boardId={board.id as string}
                    />
                  );
                }
              )
            ) : (
              <p>
                You have no boards yet. Create one by clicking the plus icon
              </p>
            )}
          </div>
        </section>
      </ScrollArea>
    </main>
  );
}
