"use client";

import { useBoardStore } from "@/lib/store/board-store";
import { useSocketStore } from "@/lib/store/socket-store";
import { Task } from "@/types";
import { DragEvent, createElement, useEffect, useState } from "react";

type DropAreaListProps = {
  onDrop: () => void;
  index: number;
};
interface PlaceholderCardProps extends DropAreaListProps {
  type: "card";
  task: Task;
}
interface PlaceholderListProps extends DropAreaListProps {
  type: "list";
}

type PlaceholderProps = PlaceholderCardProps | PlaceholderListProps;

export const Placeholder = (props: PlaceholderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { socket } = useSocketStore();
  const { draggingList, draggingCard } = useBoardStore();
  if (props.type === "list") {
    const handleDragEnter = () => {
      draggingList && !draggingCard ? setIsVisible(true) : setIsVisible(false);
    };
    const handleDragLeave = () => {
      setIsVisible(false);
    };
    const { index, onDrop } = props;
    return (
      <div
        className={`${
          draggingList && !draggingCard ? "absolute" : "hidden"
        } w-full before:absolute before:rounded-xl ${
          isVisible
            ? "before:border before:border-dashed before:inset-2 before:border-zinc-200 z-[2] p-2 "
            : " border-none "
        } `}
        style={{
          height: draggingList
            ? document.getElementById(`list-${draggingList}`)?.offsetHeight
            : "0px",
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={() => {
          socket.emit("list:move", {
            draggingList,
            index,
          });
          onDrop();
          handleDragLeave();
        }}
        onDragOver={(e) => e.preventDefault()}
      />
    );
  } else if (props.type === "card") {
    const handleDragEnter = () => {
      draggingCard ? setIsVisible(true) : setIsVisible(false);
    };
    const handleDragLeave = () => {
      setIsVisible(false);
    };
    const { index, onDrop, task } = props;
    return (
      <div
        className={`relative w-full h-2 before:absolute before:rounded-xl transition-[padding,opacity]  ${
          isVisible
            ? "before:border before:border-dashed before:inset-2 before:border-zinc-200 z-[4] py-10 opacity-100 "
            : " border-none opacity-0 "
        } `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={() => {
          socket.emit("card:move", {
            colId: task?.colId,
            draggingCard,
            index,
          });
          onDrop();
          handleDragLeave();
        }}
        onDragOver={(e) => e.preventDefault()}
      />
    );
  }
};
