import { verifyUserAuth } from "@/app/_actions/board";
import client from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
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
    const boards = await client.board.findMany({
      where: {
        user: user.id,
      },
      orderBy: {
        createdAt: "desc",
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
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });
    return new NextResponse(JSON.stringify(boards));
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
