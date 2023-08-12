"use client";

import { useState } from "react";
import { Icons } from "../Icons";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

const BoardAccessOptions = [
  {
    access: "Public",
    description: "Anyone on the internet can see this.",
    icon: "Globe",
  },
  {
    access: "Private",
    description: "Only board members can see this",
    icon: "Lock",
  },
] satisfies {
  access: string;
  description: string;
  icon: keyof typeof Icons;
}[];

export const BoardAccessPopOver = () => {
  const [boardAccess, setBoardAccess] = useState<string>("Public");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="flex items-center gap-x-[10px] text-[#828282] bg-[#F2F2F2] rounded-lg text-sm py-3 px-4 ">
        {boardAccess === "Public" ? (
          <Icons.Globe className="h-5 w-5" />
        ) : (
          <Icons.Lock className="h-5 w-5" />
        )}
        {boardAccess}
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
                onClick={() => {
                  setBoardAccess(access);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <h3 className="text-sm text-[#4F4F4F] font-medium">
                    {access}
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
