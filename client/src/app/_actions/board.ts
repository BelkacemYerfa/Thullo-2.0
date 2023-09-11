"use server";

import client from "@/lib/prismaDb";
import { BoardFormSchemaType } from "../../validation/search";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Results } from "@/components/Popups/SearchPopOver";
import { boardDescriptionSchemaType } from "../../validation/board-description";
import { Visibility } from "@prisma/client";
import { Lists } from "../(lobby)/board/[boardId]/page";
import {
  Column,
  InitialData,
  StoredImage,
  Task,
  UniqueIdentifier,
} from "@/types";

export const verifyUserAuth = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return user;
};

export async function addBoard(
  data: BoardFormSchemaType & {
    Image: StoredImage | null;
  }
) {
  const user = await verifyUserAuth();
  await client.board.create({
    data: {
      name: data.title,
      description: "",
      image: {
        create: {
          fileKey: data.Image?.fileKey ?? "",
          fileUrl: data.Image?.fileUrl ?? "",
        },
      },
      user: user.id,
      Lists: {
        create: {
          name: "To Do",
          cards: {
            create: {
              name: "Example Card",
              description: "Example Card Description",
              user: user.id,
              image: "",
            },
          },
        },
      },
    },
  });
  revalidatePath("/board");
}

export async function searchForBoards(query: string) {
  const user = await verifyUserAuth();
  const boards = await client.board.findMany({
    where: {
      user: user.id,
      name: {
        contains: query.toLowerCase(),
      },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 5,
  });
  const results: Results = [
    {
      category: "Boards",
      items: boards,
    },
  ];
  return results;
}

export async function deleteBoard(id: string) {
  await client.board.delete({
    where: {
      id,
    },
  });
  revalidatePath("/board");
}

export async function updateBoardDescription(
  data: boardDescriptionSchemaType & { id: string }
) {
  await client.board.update({
    where: {
      id: data.id,
    },
    data: {
      description: data.description,
    },
  });
}

export async function updateBoardVisibility(data: {
  id: string;
  visibility: Visibility;
}) {
  await client.board.update({
    where: {
      id: data.id,
    },
    data: {
      visibility: data.visibility,
    },
  });
}

export async function getBoardDescription(
  boardId: string
): Promise<{ description: string }> {
  return (
    (await client.board.findUnique({
      where: {
        id: boardId,
      },
      select: {
        description: true,
      },
    })) ?? {
      description: "",
    }
  );
}

export async function getBoardInfo(boardId: string): Promise<InitialData> {
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
            take: 5,
          },
        },
        take: 5,
      },
    },
  });

  if (!board) {
    redirect("/board");
  }

  // Create an array to hold the columns in the desired order
  const columnsOrder: string[] = board.Lists.map((list: Lists) => list.id);

  // Create empty objects for columns and tasks
  const columns: Record<UniqueIdentifier, Column> = {};
  const tasks: Record<UniqueIdentifier, Task> = {};

  // Populate columns and tasks in the desired order
  board.Lists.forEach((list: Lists) => {
    const column: Column = {
      id: list.id,
      title: list.name,
      taskIds: [],
    };

    list.cards.forEach((card) => {
      tasks[card.id] = {
        id: card.id,
        content: card.name,
        labels: card.labels,
        comments: card.comments?.length as number, // Assuming comments is an array
      };

      column.taskIds.push(card.id);
    });

    columns[list.id] = column;
  });

  const db = {
    columnOrder: columnsOrder,
    columns,
    tasks,
  };

  return db;
}
