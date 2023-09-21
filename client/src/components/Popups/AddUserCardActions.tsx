"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState, forwardRef } from "react";
import { Icons } from "@/components/Icons";

const Users = [
  {
    id: "1",
    username: "bylka",
    profilePic:
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  },
  {
    id: "2",
    username: "bylka",
    profilePic:
      "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg",
  },
];

export const CardAssignedMembers = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center w-fit sm:w-full justify-start gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg text-sm py-3 px-4">
          <Icons.Users2 className="h-5 w-5" />
          <span className="hidden sm:flex">Members</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-3 space-y-4 rounded-xl w-64"
        align="start"
      >
        <div className="w-full space-y-3">
          {Users.map((user) => (
            <div key={user.id} className="flex items-center gap-x-4">
              <Avatar className="rounded-lg">
                <AvatarImage
                  src={user.profilePic}
                  alt={user.username}
                  loading="lazy"
                />
                <AvatarFallback>{user.username}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-[#333333] font-semibold">
                {user.username}
              </p>
            </div>
          ))}
          <AddUserPopOver />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AddUserPopOver = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserInvite = () => {
    console.log("handleUserInvite");
    setIsOpen(false);
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center w-full justify-between text-sm h-fit text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed ">
          Assign a member
          <Icons.Plus className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-3 space-y-4 rounded-xl w-64"
        align="start"
      >
        <div className="space-y-2">
          <h3 className="text-sm text-[#4F4F4F] font-semibold">
            Invite to Board
          </h3>
          <p className="text-xs text-[#828282]">
            Invite people to your board and collaborate with them
          </p>
        </div>
        <Command className="rounded-lg border border-solid border-[#E0E0E0] shadow-outline-navigation-md ">
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty
            className={cn(true ? "hidden" : "text-center text-sm p-6")}
          >
            No People To Invite
          </CommandEmpty>
          <CommandGroup className="">
            <CommandItem
              onSelect={() => {
                if (selectedUsers.includes("Ahmed"))
                  setSelectedUsers(
                    selectedUsers.filter((id) => id !== "Ahmed")
                  );
                else setSelectedUsers([...selectedUsers, "Ahmed"]);
              }}
              className={cn(
                "p-1 text-[#333333] font-semibold flex items-center justify-between cursor-pointer aria-selected:bg-transparent "
              )}
            >
              <div className="flex items-center gap-x-3">
                <div className="h-10 w-10 bg-[#BDBDBD] flex items-center justify-center rounded-lg text-white ">
                  AH
                </div>
                Ahmed
              </div>
              {selectedUsers.includes("Ahmed") && (
                <Icons.Check className="h-5 w-5 stroke-[#219653] " />
              )}
            </CommandItem>
          </CommandGroup>
        </Command>
        <div className="flex justify-center">
          <Button
            disabled={selectedUsers.length === 0}
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            onClick={handleUserInvite}
          >
            Invite
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

AddUserPopOver.displayName = "AddUserPopOver";

export const AddUserToCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserInvite = () => {
    console.log("handleUserInvite");
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg h-8 w-8 flex items-center justify-center p-0"
          aria-label="assign a new member"
        >
          <Icons.Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-3 space-y-4 rounded-xl w-64" align="start">
        <div className="space-y-2">
          <h3 className="text-sm text-[#4F4F4F] font-semibold">
            Invite to Board
          </h3>
          <p className="text-xs text-[#828282]">
            Invite people to your board and collaborate with them
          </p>
        </div>
        <Command className="rounded-lg border border-solid border-[#E0E0E0] shadow-outline-navigation-md ">
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty
            className={cn(true ? "hidden" : "text-center text-sm p-6")}
          >
            No People To Invite
          </CommandEmpty>
          <CommandGroup className="">
            <CommandItem
              onSelect={() => {
                if (selectedUsers.includes("Ahmed"))
                  setSelectedUsers(
                    selectedUsers.filter((id) => id !== "Ahmed")
                  );
                else setSelectedUsers([...selectedUsers, "Ahmed"]);
              }}
              className={cn(
                "p-1 text-[#333333] font-semibold flex items-center justify-between cursor-pointer aria-selected:bg-transparent "
              )}
            >
              <div className="flex items-center gap-x-3">
                <div className="h-10 w-10 bg-[#BDBDBD] flex items-center justify-center rounded-lg text-white ">
                  AH
                </div>
                Ahmed
              </div>
              {selectedUsers.includes("Ahmed") && (
                <Icons.Check className="h-5 w-5 stroke-[#219653] " />
              )}
            </CommandItem>
          </CommandGroup>
        </Command>
        <div className="flex justify-center">
          <Button
            disabled={selectedUsers.length === 0}
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            onClick={handleUserInvite}
          >
            Invite
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
