"use client";

import { useTransition } from "react";
import { Icons } from "@/components/Icons";
import { Toggle } from "@/components/ui/toggle";
import { deleteComment } from "@/app/_actions/card";
import { useGenerationStore } from "@/lib/store/popups-store";
import { useSocketStore } from "@/lib/store/socket-store";
import { removeComment } from "@/lib/DndFunc/card";

type DeleteBtnProps = {
  commentId: string;
  cardId: string;
};

export const DeleteBtn = ({ commentId, cardId }: DeleteBtnProps) => {
  const [isPending, startTransition] = useTransition();
  const { initialData, setInitialData } = useGenerationStore();
  const { socket } = useSocketStore();
  const handleDelete = () => {
    socket.emit("comment:delete", {
      data: {
        cardId,
        commentId,
      },
    });
    setInitialData(removeComment(cardId, commentId, initialData));
    startTransition(async () => {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Toggle
      className="rounded-lg flex items-center justify-center text-sm p-2 bg-transparent hover:bg-[#EB5757] text-[#EB5757] hover:text-white font-medium "
      disabled={isPending}
      onClick={handleDelete}
      aria-label="Delete comment"
    >
      {isPending ? (
        <Icons.Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Icons.Trash2 className="h-5 w-5" />
      )}
    </Toggle>
  );
};
