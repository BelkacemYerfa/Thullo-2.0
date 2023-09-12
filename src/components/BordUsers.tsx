"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoardUsersLoader } from "./loaders/BoardUsersLoader";
import { cn } from "@/lib/utils";

const Users = [
  {
    id: "qmdjfhmqdfjh",
    username: "Bylka",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    isAdmin: true,
  },
] satisfies {
  id: string;
  username: string;
  imageUrl: string;
  isAdmin: boolean;
}[];

export const BoardUsers = () => {
  const isLoading = false;
  return isLoading ? (
    <BoardUsersLoader />
  ) : (
    <div className="space-y-4 ">
      {Users.map((user) => (
        <div key={user.id} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.username ?? ""}
                height={36}
                width={36}
                loading="lazy"
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg">
                {user?.username}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-sm text-[#333333] font-semibold">
              {user.username}
            </h3>
          </div>
          {user.isAdmin ? (
            !user.isAdmin ? (
              <p className="text-sm text-[#828282] font-medium ">Admin</p>
            ) : (
              <Button
                size={"sm"}
                className={cn(
                  "border border-solid border-[#EB5757] rounded-xl py-0.5 px-2 text-[#EB5757] text-sm bg-transparent hover:bg-[#EB5757] hover:text-white duration-200 ease-in-out"
                )}
              >
                Remove
              </Button>
            )
          ) : (
            <p className="text-sm text-[#828282] font-medium ">Member</p>
          )}
        </div>
      ))}
    </div>
  );
};
