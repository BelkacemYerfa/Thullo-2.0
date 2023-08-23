import { DndContextProvider } from "@/app/context/DndContextProvider";
import client from "@/lib/prismaDb";

type BoardDashboardProps = {
  boardId: string;
};

type Lists = Pick<list, "id" | "name"> & {
  cards: Cards;
};

type Cards = Pick<card, "id" | "name" | "labels" | "comments">[];

export const BoardDashboard = async ({ boardId }: BoardDashboardProps) => {
  const board = await client.board.findUnique({
    where: {
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
              comments: {
                select: {
                  id: true,
                },
              },
              labels: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
                take: 5,
              },
            },
          },
        },
      },
    },
  });

  const columnsOrder: string[] = board.Lists.map((list: Lists) => list.id);

  const columns = board.Lists.reduce((acc: any, list: Lists) => {
    acc[list.id] = {
      id: list.id,
      title: list.name,
      taskIds: list.cards.map((card) => card.id),
    };
    return acc;
  }, {});

  const tasks = board.Lists.reduce((acc: any, list: Lists) => {
    list.cards.forEach((card) => {
      acc[card.id] = {
        id: card.id,
        content: card.name,
        labels: card.labels,
        comments: card.comments,
      };
    });
    return acc;
  }, {});

  const db = {
    columnOrder: columnsOrder,
    columns,
    tasks,
  };
  return (
    <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-xl sm:rounded-t-3xl px-2 pt-2 sm:px-4 sm:pt-4 w-full h-full overflow-y-hidden pb-2 ">
      <DndContextProvider boardId={boardId} db={db} />
    </section>
  );
};
