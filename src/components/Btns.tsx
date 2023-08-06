"use client";

import { Icons } from "./Icons";
import { Toggle } from "./ui/toggle";

type DeleteBtnProps = {
  commentId: string;
};

export const DeleteBtn = ({ commentId }: DeleteBtnProps) => {
  const handleDelete = () => {
    console.log(commentId);
  };
  return (
    <Toggle
      className="rounded-lg justify-start text-sm bg-transparent hover:bg-[#EB5757] text-[#EB5757]  hover:text-white font-medium "
      onClick={handleDelete}
    >
      <Icons.Trash2 className="h-5 w-5" />
    </Toggle>
  );
};
