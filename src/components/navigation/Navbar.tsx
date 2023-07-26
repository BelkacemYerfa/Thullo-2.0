import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from "@clerk/nextjs/dist/types/server";
import { Icons } from "../Icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchPopOver } from "./SearchPopOver";

type NavBarProps = {
  user: User | null;
  boardTitle?: string;
};

export const NavBar = ({ user, boardTitle }: NavBarProps) => {
  return (
    <nav className="w-full">
      <div className="flex items-center w-full gap-x-6 py-3 px-6">
        <div className="flex items-center justify-between w-1/3 ">
          <Link href={"/"}>
            <Icons.logo />
          </Link>
          <h2 className="text-[#333333] text-lg font-medium">
            {boardTitle ?? ""}
          </h2>
        </div>
        {boardTitle && <div className="w-[2px] h-10 bg-[#E0E0E0]"></div>}
        <div
          className={`flex items-center ${
            boardTitle ? "justify-between" : "justify-end"
          } w-2/3`}
        >
          {boardTitle && (
            <Link
              href={"/"}
              className="text-[#828282] bg-[#F2F2F2] rounded-lg  text-sm py-3 px-4 flex items-center gap-x-[10px] "
            >
              <Icons.Grid className="h-5 w-5" />
              All Board
            </Link>
          )}
          <div className="flex items-center gap-x-10">
            <SearchPopOver />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-x-[10px]">
                <Avatar className="rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl ?? ""}
                    alt={user?.username ?? ""}
                    loading="lazy"
                  />
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold text-[#333333]">
                  {user?.username}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 ">
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>
                    Profile
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/settings"}>
                    Belling
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/team"}>
                    Team
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
