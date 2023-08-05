import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { User } from "@clerk/nextjs/dist/types/server";
import { Icons } from "../Icons";
import { SearchPopOver } from "../Popups/SearchPopOver";
import { LogOutBtn } from "../auth/LogOutBtn";
import { Skeleton } from "../ui/skeleton";

type NavBarProps = {
  user: User | null;
  boardTitle?: string;
};

export const NavBar = ({ user, boardTitle }: NavBarProps) => {
  return (
    <nav className=" sticky top-0 z-[3] backdrop-blur-sm bg-white/80 w-full shadow-outline-navigation ">
      <div className="w-full ">
        <div className="flex items-center w-full gap-x-6 py-2 px-3 md:py-3 md:px-6">
          <div className="flex items-center justify-between w-1/3 ">
            <Link href={"/"}>
              <Icons.logo />
            </Link>
            <h2 className="hidden md:flex text-[#333333] text-lg font-medium text-ellipsis whitespace-nowrap truncate  ">
              {boardTitle ?? ""}
            </h2>
          </div>
          {boardTitle && (
            <div className=" hidden md:flex w-[2px] h-10 bg-[#E0E0E0]"></div>
          )}
          <div
            className={`flex items-center ${
              boardTitle ? "justify-end md:justify-between" : "justify-end "
            } w-2/3`}
          >
            {boardTitle && (
              <Link
                href={"/"}
                className="hidden md:flex text-[#828282] bg-[#F2F2F2] rounded-lg  text-sm py-3 px-4 items-center gap-x-[10px] "
              >
                <Icons.Grid className="h-5 w-5" />
                All Board
              </Link>
            )}
            <div className="flex items-center gap-x-5 md:gap-x-7">
              <SearchPopOver />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-x-[10px]">
                  <Avatar className="rounded-lg">
                    {user?.imageUrl ? (
                      <AvatarImage
                        src={user?.imageUrl ?? ""}
                        alt={user?.username ?? ""}
                        loading="lazy"
                      />
                    ) : (
                      <Skeleton className="h-7 w-7 rounded-lg" />
                    )}
                    <AvatarFallback>
                      {user?.username?.split("")[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-xl " align="end">
                  <DropdownMenuLabel className="hidden md:flex text-sm font-bold text-[#333333]">
                    {user?.username}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    asChild
                    className=" flex items-center gap-x-[10px] px-3 py-2 rounded-lg"
                  >
                    <Link href={"/profile"} className="text-sm text-[#BDBDBD]">
                      <Icons.User2 className="h-4 w-4 " />
                      Profile
                      <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className=" flex items-center gap-x-[10px] px-3 py-2 rounded-lg"
                  >
                    <Link href={"/team"} className="text-sm text-[#BDBDBD]">
                      <Icons.Settings2 className="h-4 w-4" />
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className=" flex items-center gap-x-[10px] px-3 py-2 rounded-lg"
                  >
                    <Link
                      href={"https://github.com/BelkacemYerfa"}
                      className="text-sm text-[#BDBDBD]"
                      target="_blank"
                    >
                      <Icons.Github className="h-4 w-4" />
                      Github
                      <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogOutBtn />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </nav>
  );
};
