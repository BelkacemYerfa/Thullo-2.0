"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoardUsersLoader } from "./loaders/BoardUsersLoader";

const Users = [
  {
    id: "qmdjfhmqdfjh",
    username: "Bylka",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    isAdmin: false,
  },
] satisfies {
  id: string;
  username: string;
  imageUrl: string;
  isAdmin: false;
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
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.username ?? ""}
                height={40}
                width={40}
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
            user.id ? (
              <p className="text-sm text-[#828282] font-medium ">Admin</p>
            ) : (
              <Button className="border border-solid border-[#EB5757] rounded-xl py-1 px-2 text-[#EB5757] bg-transparent hover:bg-transparent">
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
