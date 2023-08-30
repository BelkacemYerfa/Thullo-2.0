"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { BoardCreationForm } from "@/components/forms/BoardCreationForm";
import { useGenerationStore } from "@/lib/store/Store";

export const AddBoardPopOver = () => {
  const { boardCard, setBoardCard } = useGenerationStore();
  return (
    <Dialog open={boardCard} onOpenChange={setBoardCard}>
      <DialogTrigger className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm text-white font-medium">
        + Add
      </DialogTrigger>
      <DialogContent className="p-5">
        <BoardCreationForm />
      </DialogContent>
    </Dialog>
  );
};
