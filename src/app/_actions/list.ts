"use server";

import client from "@/lib/prismaDb";
import { verifyUserAuth } from "./board";
import { listNameSchemaType } from "../../validation/list-name";

export async function addList(data: listNameSchemaType & { id: string }) {
  const user = await verifyUserAuth();
  await client.list.create({
    data: {
      name: data.name,
      boardId: data.id,
    },
  });
}

export async function deleteList(id: string) {
  const speed = performance.now();
  const cards = await client.card.findMany({
    where: {
      listId: id,
    },
    select: {
      id: true,
      comments: {
        select: {
          id: true,
        },
      },
      labels: {
        select: {
          id: true,
        },
      },
    },
  });

  const cardIds = cards.map((card) => card.id);

  await Promise.all(
    cards.map(async (card) => {
      const commentIds = card.comments?.map((comment) => comment.id);

      await client.user.deleteMany({
        where: {
          comments: {
            some: {
              id: {
                in: commentIds,
              },
            },
          },
        },
      });

      await client.comments.deleteMany({
        where: {
          cardId: card.id,
        },
      });

      await client.label.deleteMany({
        where: {
          cardId: card.id,
        },
      });
    })
  );

  await client.card.deleteMany({
    where: {
      id: {
        in: cardIds,
      },
    },
  });

  await client.list.delete({
    where: {
      id,
    },
  });
  const speed2 = performance.now();
  console.log("deleteList", (speed2 - speed).toFixed(2) + "ms");
}

export async function updateListName(
  data: listNameSchemaType & { id: string }
) {
  await client.list.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
  });
}

export async function getBoardBasedOnList(listId: string) {
  const list = await client.list.findUnique({
    where: {
      id: listId,
    },
    select: {
      boardId: true,
    },
  });
  if (!list) throw new Error("List not found");
  return list.boardId;
}
