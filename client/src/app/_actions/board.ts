"use server";

import client from "@/lib/prismaDb";
import { BoardFormSchemaType } from "../../validation/search";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Results } from "@/components/Popups/SearchPopOver";
import { boardDescriptionSchemaType } from "../../validation/board-description";
import { Visibility } from "@prisma/client";
import { Column, InitialData, StoredImage, Task } from "@/types";

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
    },
  });
  const currentUser = await client.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!currentUser) {
    await client.user.create({
      data: {
        isAdmin: true,
        email: user.emailAddresses[0].emailAddress,
        name:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl ?? "",
        id: user.id,
      },
    });
  }
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

export const getBoardData = async (boardId: string) => {
  return await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
      image: {
        select: {
          fileUrl: true,
        },
      },
    },
  });
};

export async function getBoardInfo(boardId: string): Promise<InitialData> {
  console.time("getBoardInfo");
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
              description: true,
              image: true,
              comments: {
                select: {
                  id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                  userId: true,
                  text: true,
                  createdAt: true,
                },
                take: 3,
              },
              labels: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                },
                take: 3,
              },
              index: true,
            },
          },
          index: true,
        },
      },
    },
  });

  if (!board) {
    redirect("/board"); // Redirect to the appropriate URL when the board is not found
  }

  // Create an array to hold the columns in the desired order
  const columnOrder = board.Lists.sort((prev, curr) => {
    return parseInt(prev.index) - parseInt(curr.index);
  }).flatMap((list) => list.id);
  // Create an object to hold columns and their associated taskIds
  const columns: { [key: string]: Column } = {};
  const tasks: { [key: string]: Task } = {};
  // Create an object to hold tasks
  board.Lists.reduce((_: any, list) => {
    columns[list.id] = {
      id: list.id,
      title: list.name,
      taskIds: list.cards
        .sort((prev, curr) => {
          return parseInt(prev.index) - parseInt(curr.index);
        })
        .flatMap((card) => card.id),
      index: list.index,
    };
    list.cards.forEach((card) => {
      tasks[card.id] = {
        ...card,
        id: card.id,
        content: card.name,
        colId: list.id,
        index: card.index,
        comments: card.comments.map((comment) => {
          return {
            ...comment,
            user: {
              ...comment.user,
              image: comment.user.image ?? "",
              commentId: comment.id,
              boardId: board.id,
              email: "",
            },
          };
        }),
      };
    });
  }, {});

  const db: InitialData = {
    columnOrder,
    columns,
    tasks,
  };
  console.timeEnd("getBoardInfo");
  return db;
}
