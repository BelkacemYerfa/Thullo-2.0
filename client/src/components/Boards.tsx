"use client";

import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { BoardCard } from "./card/BoardCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Icons } from "./Icons";
import { Boards } from "@/types";

type BoardsProps = {
  initialBoards: Boards;
};

export const BoardS = ({ initialBoards }: BoardsProps) => {
  const lastBoardRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastBoardRef.current,
    threshold: 1,
  });
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      ["scrolling-boards"],
      async ({ pageParam = 1 }) => {
        const query = `/api/boards?limit=${6}&page=${pageParam}`;
        const { data } = await axios.get(query);
        return data as Boards;
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
        initialData: { pages: [initialBoards], pageParams: [1] },
      }
    );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const boards = data?.pages.flatMap((page) => page) ?? initialBoards;
  return boards.length !== 0 ? (
    <>
      <ul className="flex w-full flex-col items-center justify-center overflow-y-auto p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 pb-5 overflow-hidden ">
        {boards.map((board, index) => {
          if (boards.length - 1 === index) {
            return (
              <li
                key={board.id}
                ref={ref}
                className="col-span-1 w-full max-w-sm"
              >
                <BoardCard
                  banner={board.image?.[0].fileUrl}
                  title={board.name}
                  users={[""]}
                  id={board.id}
                />
              </li>
            );
          } else {
            return (
              <li key={board.id} className="col-span-1 w-full max-w-sm">
                <BoardCard
                  banner={board.image?.[0].fileUrl}
                  title={board.name}
                  users={[""]}
                  id={board.id}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className="mb-3 pb-3 flex justify-center">
        {isFetchingNextPage && (
          <Icons.Loader2 className="h-5 w-5 animate-spin" />
        )}
      </div>
    </>
  ) : (
    <div className="flex justify-center">
      <p>You don&apos;t have any board now , create one</p>
    </div>
  );
};
