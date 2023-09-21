"use client";

import { useBoardStore } from "@/lib/store/board-store";
import { useSocketStore } from "@/lib/store/socket-store";
import { useState } from "react";

type DropAreaProps = {
  onDrop: () => void;
  index: number;
};

export const DropAreaCard = ({ onDrop, index }: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { draggingCard } = useBoardStore();
  const { socket } = useSocketStore();
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
        if (!socket) return;
        socket.emit("card:move", {
          cardId: draggingCard,
          index,
        });
        socket.on("dragTaskEmit", (data) => {
          onDrop();
          console.log(data);
        });
        handleDragLeave();
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};

export const DropAreaList = ({ onDrop }: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
        onDrop();
        handleDragLeave();
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};
