import { AddBoardPopOver } from "@/components/Popups/AddBoardPopOver";
import { BoardCard } from "@/components/card/BoardCard";
import { NavBar } from "@/components/navigation/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import client from "@/lib/prismaDb";
import { verifyUserAuth } from "@/app/_actions/board";
import { Shell } from "@/components/Shell";
import { Boards } from "@/components/Boards";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await verifyUserAuth();
  const boards: Boards = await client.board.findMany({
    where: {
      user: user.id,
    },
    //you can't use include and select in the same call
    select: {
      id: true,
      name: true,
      image: {
        select: {
          fileUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  return (
    <Shell>
      <NavBar user={user} />
      <ScrollArea className="h-full w-full">
        <section className="flex-1 max-w-[90%] sm:max-w-[80%] mx-auto pt-10 space-y-7 ">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-[#333333] font-medium text-lg">All Boards</h2>
            <AddBoardPopOver />
          </div>
          <Boards initialBoards={boards} />
        </section>
      </ScrollArea>
    </Shell>
  );
}
