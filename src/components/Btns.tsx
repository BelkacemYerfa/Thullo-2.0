"use client";

import { useTransition } from "react";
import { Icons } from "@/components/Icons";
import { Toggle } from "@/components/ui/toggle";
import { deleteComment } from "@/app/_actions/card";

type DeleteBtnProps = {
  commentId: string;
  cardId: string;
};

export const DeleteBtn = ({ commentId, cardId }: DeleteBtnProps) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteComment(commentId, cardId);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Toggle
      className="rounded-lg justify-start text-sm bg-transparent p-2 hover:bg-[#EB5757] text-[#EB5757]  hover:text-white font-medium "
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
