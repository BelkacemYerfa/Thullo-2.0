"use client";

import { usePathname } from "next/navigation";
import { Icons } from "./Icons";
import { Toggle } from "./ui/toggle";
import Link from "next/link";

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

export const CloseLink = () => {
  const pathname = usePathname();
  return (
    <Link href={pathname.split("?")[0]} className="text-[#333333] ">
      <div className="max-w-full mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
    </Link>
  );
};
