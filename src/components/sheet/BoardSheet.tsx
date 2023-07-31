"use client";

import Image from "next/image";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { BoardDescriptionForm } from "../forms/BoardDescriptionForm";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useUser } from "@clerk/nextjs";

type BoardSheetProps = {
  boardUsers: string[];
  boardTitle: string;
};

export const BoardSheet = ({ boardUsers, boardTitle }: BoardSheetProps) => {
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] =
    useState<boolean>(false);
  const { user } = useUser();
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg  text-sm py-3 px-4 ">
          <Icons.MoreHorizontal className="h-5 w-5" />
          Show Menu
        </div>
      </SheetTrigger>
      <SheetContent className="px-2 py-6 flex flex-col gap-y-2">
        <SheetHeader className="px-3">
          <SheetTitle className="text-sm text-[#333333] font-semibold">
            {boardTitle}
          </SheetTitle>
        </SheetHeader>
        <div className="px-3">
          <Separator />
        </div>
        <div className=" flex-1  overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className=" space-y-4">
              <div className="space-y-3">
                <div className="flex text-[#BDBDBD] items-center space-x-[6px]">
                  <Icons.User2 className="h-4 w-4" />
                  <p className="text-xs text-[#BDBDBD] font-semibold">
                    Made By
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    }
                    alt={"user"}
                    height={40}
                    width={40}
                    className="rounded-lg"
                    quality={100}
                  />
                  <div className="flex items-center flex-col space-y-1">
                    <h3 className="text-sm text-[#333333] font-semibold ">
                      Daniel Jensen
                    </h3>
                    <p className="text-xs text-[#BDBDBD] font-semibold">
                      on 4 July, 2020
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 ">
                <div className="flex items-center gap-x-3">
                  <div className="text-[#BDBDBD] flex items-center gap-x-[6px]">
                    <Icons.File className="h-4 w-4" />
                    <h3 className="text-xs font-semibold">Description</h3>
                  </div>
                  {!isDescriptionFormOpen && (
                    <Button
                      className=" flex items-center gap-x-2 px-3 py-1 border border-[#BDBDBD] border-solid rounded-lg bg-transparent hover:bg-transparent text-[#828282]"
                      onClick={() =>
                        setIsDescriptionFormOpen(!isDescriptionFormOpen)
                      }
                    >
                      <Icons.Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>
                <BoardDescriptionForm
                  isDescriptionFormOpen={isDescriptionFormOpen}
                  setIsDescriptionFormOpen={setIsDescriptionFormOpen}
                />
              </div>
              <div className="space-y-5">
                <div className="text-[#BDBDBD] flex items-center gap-x-[6px]">
                  <Icons.Users2 className="h-4 w-4" />
                  <h3 className="text-xs font-semibold">Team</h3>
                </div>
                <div className="space-y-4 ">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={
                          user?.imageUrl ?? "https://i.pravatar.cc/150?img=68"
                        }
                        alt={user?.username ?? "user"}
                        height={40}
                        width={40}
                        loading="lazy"
                        className="rounded-lg"
                        quality={100}
                      />
                      <h3 className="text-sm text-[#333333] font-semibold">
                        {user?.username}
                      </h3>
                    </div>
                    {true ? (
                      <p className="text-sm text-[#828282] font-medium ">
                        Admin
                      </p>
                    ) : (
                      <Button className="border border-solid border-[#EB5757] rounded-xl py-1 px-2 text-[#EB5757] bg-transparent hover:bg-transparent">
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
