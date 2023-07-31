"use client";

import { useGenerationStore } from "@/lib/store/Store";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { ListDeletePopOver } from "./ListDeletePopOver";
import { useState } from "react";

export const ListCardsSettingsPopOver = () => {
  const { rename, setRename } = useGenerationStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleRename = () => {
    setRename(true);
    setIsOpen(false);
  };
  return !rename ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Icons.MoreHorizontal className="h-5 w-5" />
      </PopoverTrigger>
      <PopoverContent
        className="p-1 space-y-1 max-w-[200px] rounded-xl"
        align="start"
      >
        <Button
          className="py-2 px-3 flex justify-start cursor-default duration-200 ease-linear text-[#828282] text-sm rounded-lg bg-transparent w-full hover:bg-[#F2F2F2]"
          onClick={handleRename}
        >
          Rename
        </Button>
        <Separator />
        <ListDeletePopOver />
      </PopoverContent>
    </Popover>
  ) : (
    <div className="cursor-pointer" onClick={() => setRename(false)}>
      <Icons.X className="h-5 w-5" />
    </div>
  );
};
