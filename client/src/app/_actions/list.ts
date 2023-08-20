"use server";

import client from "@/lib/prismaDb";
import { verifyUserAuth } from "./board";
import { revalidatePath } from "next/cache";
import { listNameSchemaType } from "@/validation/list-name";

export async function addList(data: listNameSchemaType & { id: string }) {
  const user = await verifyUserAuth();
  await client.list.create({
    data: {
      name: data.name,
      boardId: data.id,
      cards: {
        create: {
          name: "New Card",
          description: "New Card Description",
          user: user.id,
        },
      },
    },
  });
  revalidatePath(`/board/${data.id}`);
}

export async function deleteList(id: string) {
  await client.card.deleteMany({
    where: {
      listId: id,
    },
  });
  await client.list.delete({
    where: {
      id,
    },
  });
  revalidatePath(`/board/${id}`);
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
