import { verifyUserAuth } from "@/app/_actions/board";
import { DndContextProvider } from "@/app/context/DndContextProvider";
import client from "@/lib/prismaDb";

type BoardDashboardProps = {
  boardId: string;
};

export const BoardDashboard = async ({ boardId }: BoardDashboardProps) => {
  const user = await verifyUserAuth();

  const board = await client.board.findUnique({
    where: {
      user: user.id,
      id: boardId,
    },
    include: {
      Lists: {
        select: {
          id: true,
          name: true,
          cards: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const columns = board.Lists.reduce((acc, list) => {
    acc[list.id] = {
      id: list.id,
      name: list.name,
      cards: list.cards.map((card) => card.id),
    };
    return acc;
  }, {});

  const cards = board.Lists.reduce((acc, list) => {
    list.cards.forEach((card) => {
      acc[card.id] = card;
    });
    return acc;
  }, {});

  console.log("columns: ", columns);
  console.log("cards: ", cards);

  return (
    <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-xl sm:rounded-t-3xl px-2 pt-2 sm:px-4 sm:pt-4 w-full h-full overflow-y-hidden pb-2 ">
      <DndContextProvider boardId={boardId} />
    </section>
  );
};
