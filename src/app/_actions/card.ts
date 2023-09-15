"use server";

import client from "@/lib/prismaDb";
import { cardSchemaType } from "../../validation/card";
import { verifyUserAuth } from "./board";
import { revalidatePath } from "next/cache";
import { boardDescriptionSchemaType } from "../../validation/board-description";
import { labelCreationSchemaType } from "../../validation/label-creation";
import { comments, labels, Card } from "@/types";

export async function addCard(
  Info: cardSchemaType & {
    listId: string;
  }
) {
  const user = await verifyUserAuth();
  const list = await client.list.findUnique({
    where: {
      id: Info.listId,
    },
    select: {
      boardId: true,
    },
  });
  if (!list) throw new Error("Board not found");

  await client.card.create({
    data: {
      name: Info.name,
      description: "",
      listId: Info.listId,
      user: user.id,
    },
  });
  revalidatePath(`/board/${list.boardId}`);
}

export async function deleteCardMutation(cardId: string) {
  const boardId = await getBoardBasedOnCard(cardId);
  await client.comments.deleteMany({
    where: {
      cardId: cardId,
    },
  });
  await client.card.delete({
    where: {
      id: cardId,
    },
  });
  revalidatePath(`/board/${boardId}`);
}

//for the update of the info of the card
export async function updateCardName() {
  await client.card.update({
    where: {
      id: "",
    },
    data: {
      name: "",
    },
  });
}

export async function getCardInfoWithList(cardId: string): Promise<Card> {
  const card = await client.card.findUnique({
    where: {
      id: cardId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      user: true,
      image: true,
      comments: {
        select: {
          id: true,
        },
      },
      listId: true,
    },
  });
  if (!card) throw new Error("Card not found");
  const list = await client.list.findFirst({
    where: {
      id: card.listId,
    },
    select: {
      name: true,
    },
  });
  if (!list) throw new Error("List not found");
  return {
    ...card,
    image: card.image as string,
    list: list,
  };
}

export async function getBoardBasedOnCard(cardId: string) {
  const card = await client.card.findFirst({
    where: {
      id: cardId,
    },
  });
  if (!card) throw new Error("Card not found");
  const list = await client.list.findFirst({
    where: {
      id: card.listId,
    },
  });
  if (!list) throw new Error("List not found");
  const board = await client.board.findFirst({
    where: {
      id: list.boardId,
    },
  });
  if (!board) throw new Error("Board not found");
  return board.id;
}

export async function updateCardDescription(
  data: boardDescriptionSchemaType & {
    cardId: string;
  }
) {
  const boardId = await getBoardBasedOnCard(data.cardId);
  await client.card.update({
    where: {
      id: data.cardId,
    },
    data: {
      description: data.description,
    },
  });
  revalidatePath(`/board/${boardId}?cardId=${data.cardId}`);
}

//comments section

export async function getComments(cardId: string): Promise<comments[]> {
  return await client.comments.findMany({
    where: {
      cardId,
    },
    select: {
      user: {
        select: {
          name: true,
          image: true,
          id: true,
        },
      },
      text: true,
      id: true,
      createdAt: true,
    },
  });
}

export async function addComment(
  data: boardDescriptionSchemaType & {
    cardId: string;
  }
) {
  const user = await verifyUserAuth();
  const boardId = await getBoardBasedOnCard(data.cardId);
  const comment = await client.comments.create({
    data: {
      text: data.description,
      user: {
        create: {
          id: user.id,
          name:
            user.username ?? user.emailAddresses[0]?.emailAddress.split("@")[0],
          email: user.emailAddresses[0]?.emailAddress,
          image: user.imageUrl ?? "",
          boardId: boardId,
        },
      },
      cardId: data.cardId,
    },
  });
  console.log(comment);
  revalidatePath(`/board/${boardId}`);
}

export async function deleteComment(commentId: string, cardId: string) {
  const boardId = await getBoardBasedOnCard(cardId);
  await client.user.delete({
    where: {
      commentId,
    },
  });
  await client.comments.delete({
    where: {
      id: commentId,
    },
  });
  revalidatePath(`/board/${boardId}?cardId=${cardId}`);
}

//labels section

export async function getLabels(
  cardId: string,
  take?: number
): Promise<labels[]> {
  return await client.label.findMany({
    where: {
      cardId,
    },
    select: {
      id: true,
      name: true,
      color: true,
    },
    take: take ?? undefined,
  });
}

export async function addLabel(
  data: labelCreationSchemaType & {
    cardId: string;
  }
) {
  const boardId = await getBoardBasedOnCard(data.cardId);
  await client.label.create({
    data: {
      name: data.name,
      color: data.color,
      cardId: data.cardId,
    },
  });
  revalidatePath(`/board/${boardId}?cardId=${data.cardId}`);
}

export async function deleteLabel(labelId: string, cardId: string) {
  const boardId = await getBoardBasedOnCard(cardId);
  await client.label.delete({
    where: {
      id: labelId,
    },
  });
  revalidatePath(`/board/${boardId}?cardId=${cardId}`);
}
