"use client";

import { Icons } from "./Icons";
import { Toggle } from "./ui/toggle";

export const DeleteBtn = () => {
  return (
    <Toggle className="rounded-lg justify-start text-sm bg-transparent hover:bg-[#EB5757] text-[#EB5757]  hover:text-white font-medium ">
      <Icons.Trash2 className="h-5 w-5" />
    </Toggle>
  );
};
