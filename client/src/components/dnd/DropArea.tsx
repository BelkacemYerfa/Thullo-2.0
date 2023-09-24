"use client";

import { useBoardStore } from "@/lib/store/board-store";
import { useSocketStore } from "@/lib/store/socket-store";
import { Column, Task } from "@/types";
import { useState } from "react";

type DropAreaProps = {
  onDrop: () => void;
  index: number;
  task: Task;
};

export const DropAreaCard = ({ onDrop, index, task }: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { socket } = useSocketStore();
  const { draggingCard } = useBoardStore();
  const handleDragEnter = () => {
    setIsVisible(true);
  };
  const handleDragLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`h-3 drop relative before:absolute before:border before:border-dashed before:inset-2 before:border-zinc-200 transition-[opacity,padding] before:rounded-xl ${
        isVisible ? "py-10 opacity-100" : "opacity-0"
      } `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={() => {
        socket.emit("card:move", {
          colId: task.colId,
          draggingCard,
          index,
        });
        onDrop();
        handleDragLeave();
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};

type DropAreaListProps = {
  onDrop: () => void;
  index: number;
};

export const DropAreaList = ({ onDrop, index }: DropAreaListProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { socket } = useSocketStore();
  const { draggingList } = useBoardStore();
  const handleDragEnter = () => {
    setIsVisible(true);
  };
  const handleDragLeave = () => {
    setIsVisible(false);
  };
  return (
    <div
      className={`w-2 relative before:absolute before:border before:border-dashed before:inset-2 before:border-zinc-200 transition-[opacity,padding] before:rounded-xl ${
        isVisible ? "px-10 opacity-100" : "opacity-0"
      } `}
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
};
