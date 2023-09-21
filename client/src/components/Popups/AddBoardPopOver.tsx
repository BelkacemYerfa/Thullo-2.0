"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { BoardCreationForm } from "@/components/forms/BoardCreationForm";
import { useGenerationStore } from "@/lib/store/Store";
import { Icons } from "../Icons";

export const AddBoardPopOver = () => {
  const { boardCard, setBoardCard } = useGenerationStore();
  return (
    <Dialog open={boardCard} onOpenChange={setBoardCard}>
      <DialogTrigger className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm text-white font-medium flex items-center gap-2 ">
        <Icons.Plus className="h-4 w-4" /> Add
      </DialogTrigger>
      <DialogContent className="p-5">
        <BoardCreationForm />
      </DialogContent>
    </Dialog>
  );
};
