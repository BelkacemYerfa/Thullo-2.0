import { Lists } from "@/app/(lobby)/board/[boardId]/page";
import { verifyUserAuth } from "@/app/_actions/board";
import client from "@/lib/prismaDb";
import { Column, Task, UniqueIdentifier } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Params = {
  listId: string;
};

export async function GET(
  req: NextRequest,
  { params: { listId } }: { params: Params }
) {
  const url = new URL(req.url);
  const user = await verifyUserAuth();
  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const list = await client.list.findUnique({
      where: {
        id: listId,
      },
      select: {
        cards: {
          select: {
            id: true,
            name: true,
            comments: {
              select: {
                id: true,
              },
            },
          },
          take: parseInt(limit),
          skip: (parseInt(page) - 1) * parseInt(limit),
        },
      },
    });
    const cards = list?.cards.map((card) => {
      return {
        ...card,
        content: card.name,
        comments: card.comments.length,
      };
    });
    return new NextResponse(JSON.stringify(cards));
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
