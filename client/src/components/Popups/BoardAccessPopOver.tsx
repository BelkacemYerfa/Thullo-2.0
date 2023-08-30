"use client";

import { useState, useTransition } from "react";
import { Icons } from "@/components/Icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { updateBoardVisibility } from "@/app/_actions/board";
import { Visibility } from "@prisma/client";

const BoardAccessOptions = [
  {
    access: Visibility.PUBLIC,
    description: "Anyone on the internet can see this.",
    icon: "Globe",
  },
  {
    access: Visibility.PRIVATE,
    description: "Only board members can see this",
    icon: "Lock",
  },
] satisfies {
  access: Visibility;
  description: string;
  icon: keyof typeof Icons;
}[];

type BoardAccessPopOverProps = {
  boardId: string;
  visibility: Visibility;
};

export const BoardAccessPopOver = ({
  boardId,
  visibility,
}: BoardAccessPopOverProps) => {
  const [boardAccess, setBoardAccess] = useState<Visibility>(visibility);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleAccess = (access: Visibility) => {
    startTransition(async () => {
      await updateBoardVisibility({ id: boardId, visibility: access });
      setBoardAccess(access);
    });
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="flex items-center gap-x-[10px] text-[#828282] bg-[#F2F2F2] rounded-lg text-sm py-3 px-4 disabled:cursor-not-allowed disabled:opacity-80 "
        disabled={isPending}
      >
        {boardAccess === Visibility.PUBLIC ? (
          <Icons.Globe className="h-4 w-4" />
        ) : (
          <Icons.Lock className="h-4 w-4" />
        )}
        {boardAccess === Visibility.PUBLIC ? "Public" : "Private"}
      </PopoverTrigger>
      <PopoverContent className="w-72 rounded-xl p-3 space-y-4" align="start">
        <div className="space-y-2">
          <h3 className="text-sm text-[#4F4F4F] font-semibold ">Visibility</h3>
          <p className="text-sm text-[#828282]">
            Choose who can see to this board.
          </p>
        </div>
        <div className="space-y-1">
          {BoardAccessOptions.map(({ access, description, icon }, index) => {
            const Icon = Icons[icon];
            return (
              <div
                key={index + access}
                className={`rounded-lg py-2 px-3 flex flex-col items-start space-y-2 cursor-default ${
                  boardAccess === access
                    ? "bg-[#F2F2F2]"
                    : "bg-white hover:bg-[#F2F2F2]"
                } `}
                onClick={() => handleAccess(access)}
              >
                <div className="flex items-center space-x-2 text-[#4F4F4F]">
                  <Icon className="h-4 w-4" />
                  <h3 className="text-sm font-medium">
                    {access === Visibility.PUBLIC ? "Public" : "Private"}
                  </h3>
                </div>
                <p className="text-[#828282] text-xs">{description}</p>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
