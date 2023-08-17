"use server";

import client from "@/lib/prismaDb";
import { BoardFormSchema } from "@/validation/search";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Results } from "@/components/Popups/SearchPopOver";

export const verifyUserAuth = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return user;
};

export async function addBoard(
  data: z.infer<typeof BoardFormSchema> & {
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
              comments: {
                create: {
                  text: "Example Comment",
                  user: user.id,
                },
              },
            },
          },
        },
      },
    },
  });
  revalidatePath("/");
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
      image: {
        select: {
          fileUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const results: Results = [
    {
      category: "Boards",
      items: boards,
    },
  ];
  return results;
}
