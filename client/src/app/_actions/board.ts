"use server";

import client from "@/lib/prismaDb";
import { BoardFormSchema } from "@/validation/search";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addBoard(
  data: z.infer<typeof BoardFormSchema> & {
    Image: StoredImage | null;
  }
) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
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
