"use client";

import { useGenerationStore } from "@/lib/store/Store";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { ListDeletePopOver } from "./ListDeletePopOver";
import { useState } from "react";

type ListCardsSettingsPopOverProps = {
  id: string;
};

export const ListCardsSettingsPopOver = ({
  id,
}: ListCardsSettingsPopOverProps) => {
  const { rename, setRename } = useGenerationStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleRename = () => {
    console.log(id);
    setRename(true);
    setIsOpen(false);
  };
  return rename ? (
    <div
      className="cursor-pointer text-[#EB5757]"
      onClick={() => setRename(false)}
    >
      <Icons.X className="h-5 w-5" />
    </div>
  ) : (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger aria-label="open list settings">
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
  );
};
