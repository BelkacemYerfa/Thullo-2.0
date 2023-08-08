"use client";

import { Icons } from "../Icons";
import { ListCreationForm } from "../forms/ListCreationFrom";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useGenerationStore } from "@/lib/store/Store";

export const AddNewListPopOver = () => {
  const { newList, setNewList } = useGenerationStore();
  return (
    <Dialog open={newList} onOpenChange={setNewList}>
      <DialogTrigger className="h-fit">
        <div className="flex items-center justify-between text-sm h-fit text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] w-80  rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed  ">
          Add another list
          <Icons.Plus className="h-5 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-5">
        <ListCreationForm />
      </DialogContent>
    </Dialog>
  );
};
