"use client";

import { useBoardStore } from "@/lib/store/board-store";
import { useSocketStore } from "@/lib/store/socket-store";
import { Task } from "@/types";
import { useEffect, useState } from "react";

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
  const [style, setStyle] = useState({ width: 0, height: 0 });
  const { draggingList, draggingCard } = useBoardStore();
  const parent = draggingCard
    ? document.getElementById(`card-${draggingCard}`)
    : document.getElementById(`list-${draggingList}`);
  useEffect(() => {
    if (parent) {
      const style = {
        width: parent.offsetWidth,
        height: parent.offsetHeight,
      };
      setStyle(style);
    }
  }, [draggingList, draggingCard, parent]);
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
        className={`absolute before:absolute before:rounded-xl ${
          isVisible
            ? "before:border before:border-dashed before:inset-2 before:border-zinc-200 z-10 p-2 "
            : " border-none "
        } `}
        style={style}
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
        className={`absolute h-full w-full bg-red-400 before:absolute before:rounded-xl  ${
          isVisible
            ? "before:border before:border-dashed before:inset-2 before:border-zinc-200 z-20   "
            : " border-none h-0 w-0"
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
