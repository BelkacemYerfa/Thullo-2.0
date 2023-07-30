"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Icons } from "../Icons";

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

export const BoardAccessDropDown = () => {
  const [boardAccess, setBoardAccess] = useState<string>("Public");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-x-[10px] text-[#828282] bg-[#F2F2F2] rounded-lg text-sm py-3 px-4 ">
        {boardAccess === "Public" ? (
          <Icons.Globe className="h-5 w-5" />
        ) : (
          <Icons.Lock className="h-5 w-5" />
        )}
        {boardAccess}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" w-72 rounded-xl p-3 space-y-3"
        align="start"
      >
        <>
          <DropdownMenuLabel className="p-0">Visibility</DropdownMenuLabel>
          <p className="text-sm text-[#828282]">
            Choose who can see to this board.
          </p>
        </>
        <DropdownMenuGroup className="space-y-1">
          {BoardAccessOptions.map(({ access, description, icon }, index) => {
            const Icon = Icons[icon];
            return (
              <DropdownMenuItem
                key={index + access}
                className="bg-white hover:bg-[#F2F2F2] rounded-lg py-2 px-3 flex flex-col items-start space-y-2"
                onClick={() => setBoardAccess(access)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <h3 className="text-sm text-[#4F4F4F] font-medium">
                    {access}
                  </h3>
                </div>
                <p className="text-[#828282] text-xs">{description}</p>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
