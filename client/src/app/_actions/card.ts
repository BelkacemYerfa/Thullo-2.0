"use server";

import client from "@/lib/prismaDb";
import { cardSchemaType } from "@/validation/card";
import { verifyUserAuth } from "./board";
import { revalidatePath } from "next/cache";

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

  const card = await client.card.create({
    data: {
      name: Info.name,
      description: "",
      listId: Info.listId,
      user: user.id,
    },
  });
  console.log(card);
  revalidatePath(`/board/${list.boardId}`);
}

export async function deleteCard(id: string) {
  await client.card.delete({
    where: {
      id,
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

export async function getCardInfoWithList(cardId: string) {
  const card = await client.card.findFirst({
    where: {
      id: cardId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      user: true,
      image: true,
      comments: true,
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
    list,
  };
}
