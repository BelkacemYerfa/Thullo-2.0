"use client";

import { Icons } from "@/components/Icons";
import { ListCreationForm } from "@/components/forms/ListCreationFrom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGenerationStore } from "@/lib/store/Store";

type AddNewListPopOverProps = {
  boardId: string;
};

export const AddNewListPopOver = ({ boardId }: AddNewListPopOverProps) => {
  const { newList, setNewList } = useGenerationStore();
  return (
    <Dialog open={newList} onOpenChange={setNewList}>
      <DialogTrigger className="h-fit snap-center ">
        <div className="flex items-center justify-between text-sm h-fit text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] w-[21.25rem]  rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed  ">
          Add another list
          <Icons.Plus className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-5">
        <DialogHeader>
          <h2 className="text-base font-medium">Add another list</h2>
          <p className="text-sm text-[#333333]">
            Create an new list for the board
          </p>
        </DialogHeader>
        <ListCreationForm boardId={boardId} />
      </DialogContent>
    </Dialog>
  );
};
