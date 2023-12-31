"use server";

import client from "@/lib/prismaDb";
import { cardSchemaType } from "../../validation/card";
import { verifyUserAuth } from "./board";
import { revalidatePath } from "next/cache";
import { boardDescriptionSchemaType } from "../../validation/board-description";
import { labelCreationSchemaType } from "../../validation/label-creation";
import { comments, labels, Card, User, Task, InitialData } from "@/types";

export async function createCard(
  Info: cardSchemaType & {
    listId: string;
    id: string;
    index: string;
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

  const newCard = await client.card.create({
    data: {
      id: Info.id,
      name: Info.name,
      description: "",
      listId: Info.listId,
      userId: user.id,
      index: Info.index,
    },
  });
  const wantedCard: Task = {
    ...newCard,
    id: newCard.id,
    content: newCard.name,
    colId: newCard.listId,
    labels: [],
    comments: [],
    image: newCard.image ?? "",
    index: newCard.index,
  };
  return wantedCard;
}

export async function deleteCardMutation(cardId: string) {
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

export const updateCardIndex = (initialData: InitialData, dest: string) => {
  initialData.columns[dest].taskIds.forEach(async (cardId, index) => {
    await client.card.update({
      where: {
        id: cardId,
      },
      data: {
        index: index.toString(),
        listId: dest,
      },
    });
  });
};

export async function getCardInfoWithList(cardId: string): Promise<Card> {
  const card = await client.card.findUnique({
    where: {
      id: cardId,
    },
    select: {
      id: true,
      name: true,
      description: true,
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
  await client.card.update({
    where: {
      id: data.cardId,
    },
    data: {
      description: data.description,
    },
  });
}

//comments section

export async function getComments(cardId: string): Promise<comments[]> {
  const comments = await client.comments.findMany({
    where: {
      cardId,
    },
    select: {
      userId: true,
      text: true,
      id: true,
      createdAt: true,
    },
  });
  const users = await client.user.findMany({
    where: {
      comments: {
        some: {
          cardId: cardId,
        },
      },
    },
    select: {
      name: true,
      image: true,
      id: true,
    },
  });
  return comments.map((comment) => ({
    ...comment,
    user: users.find((user) => user.id === comment.userId) as User,
  }));
}

export async function createComment(
  data: boardDescriptionSchemaType & {
    cardId: string;
    commentId: string;
  }
) {
  const user = await verifyUserAuth();
  await client.comments.create({
    data: {
      id: data.commentId,
      text: data.description,
      userId: user.id,
      cardId: data.cardId,
    },
  });
  await client.user.update({
    where: {
      id: user.id,
    },
    data: {
      comments: {
        connect: {
          id: data.commentId,
        },
      },
    },
  });
}

export async function deleteComment(commentId: string) {
  await client.comments.delete({
    where: {
      id: commentId,
    },
  });
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

export async function createLabel(
  data: labelCreationSchemaType & {
    cardId: string;
    id: string;
  }
) {
  await client.label.create({
    data: {
      id: data.id,
      name: data.name,
      color: data.color,
      cardId: data.cardId,
    },
  });
}

export async function deleteLabel(labelId: string, cardId: string) {
  await client.label.delete({
    where: {
      id: labelId,
    },
  });
}
