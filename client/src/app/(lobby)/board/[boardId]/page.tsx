import {
  getBoardColleagues,
  getBoardInfo,
  verifyUserAuth,
} from "@/app/_actions/board";
import { DndClient } from "@/components/dnd/DndClient";
import { Shell } from "@/components/Shell";
import { NavBar } from "@/components/navigation/Navbar";
import { BoardSettings } from "@/components/settings/BoardSettings";
import client from "@/lib/prismaDb";
import jsonwebtoken, { Jwt, JwtPayload } from "jsonwebtoken";
import { notFound, redirect } from "next/navigation";
import { Card, List } from "@/types";

type BoardPageProps = {
  searchParams: {
    [key: string]: string;
  };
  params: {
    boardId: string;
  };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export type BoardDashboardProps = {
  boardId: string;
};

export type Lists = Pick<List, "id" | "name"> & {
  cards: Cards;
};

export type Cards = Pick<Card, "id" | "name"> &
  {
    comments: {
      id: string;
      text: string;
    };
  }[];

export async function generateMetadata({
  params: { boardId },
}: BoardPageProps) {
  if (!boardId) notFound();
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
      description: true,
    },
  });
  if (!board) notFound();
  return {
    title: `${board.name}`,
    description: ` ${boardId} , description: ${board.description}`,
  };
}

export default async function BoardPage({
  searchParams,
  params: { boardId },
}: BoardPageProps) {
  const user = await verifyUserAuth();
  if (!boardId) redirect("/board");
  const board = await client.board.findUnique({
    where: {
      id: boardId,
    },
    select: {
      name: true,
    },
  });
  if (!board) notFound();
  const data: any = await getBoardColleagues();
  console.log(data.Colleagues);
  if (
    !data.Colleagues.includes({
      id: user.id,
    })
  ) {
    if (searchParams.invite) {
      const dec = jsonwebtoken.verify(
        searchParams.token,
        process.env.JWT_SECRET!
      );
      const { exp } = dec as JwtPayload;
      if (Date.now() / 1000 > (exp as number)) return redirect("/board");
      //update the database by adding this user to colleagues
    } else {
      return redirect("/board");
    }
  }
  const db = await getBoardInfo(boardId);

  return (
    <Shell>
      <section className="w-full space-y-5">
        <NavBar user={user} boardTitle={board.name} />
        <section className="max-w-[95%] m-auto">
          <BoardSettings boardId={boardId} />
        </section>
      </section>
      <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-xl sm:rounded-t-3xl px-2 pt-2 sm:px-4 sm:pt-4 w-full h-full overflow-y-hidden pb-2 ">
        <DndClient boardId={boardId} db={db} />
      </section>
    </Shell>
  );
}
