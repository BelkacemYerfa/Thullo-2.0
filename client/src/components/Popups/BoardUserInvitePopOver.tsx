"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { startTransition, useCallback, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { sendEmail } from "@/app/_actions/email";
import { useParams } from "next/navigation";
import { getBoardData } from "@/app/_actions/board";

type BoardUserInvitePopOverProps = {
  Colleagues: any;
};

export const BoardUserInvitePopOver = ({
  Colleagues,
}: BoardUserInvitePopOverProps) => {
  const { boardId } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  const handleSelectAll = () => {
    console.log("users : ", selectedUsers);
  };
  const handleUserInvite = () => {
    handleSelectAll();
    if (!debouncedQuery) return;
    if (
      debouncedQuery.match(
        new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$", "gim")
      )
    ) {
      startTransition(async () => {
        try {
          await userInviteThroughEmail({
            username: debouncedQuery,
          });
          setIsOpen(false);
          setQuery("");
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      console.log("username : ", debouncedQuery);
    }
  };
  const userInviteThroughEmail = async ({ username }: { username: string }) => {
    const boardInfo = await getBoardData(boardId as string);
    await sendEmail({
      username,
      teamName: boardInfo?.name as string,
      teamImage: boardInfo?.image?.[0].fileUrl as string,
      inviteLink: `http://localhost:3000/board/${boardId}`,
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg h-9 w-9 flex items-center justify-center "
        aria-label="open new user"
      >
        <Icons.Plus className="h-5 w-5 text-white" />
      </PopoverTrigger>
      <PopoverContent className="p-3 space-y-4 rounded-xl" align="start">
        <div className="space-y-2">
          <h3 className="text-sm text-[#4F4F4F] font-semibold">
            Invite to Board
          </h3>
          <p className="text-xs text-[#828282]">
            Invite people to your board and collaborate with them
          </p>
        </div>
        <Command className="rounded-lg border border-solid border-[#E0E0E0] shadow-outline-navigation-md ">
          <CommandInput
            placeholder="Username or Email"
            onValueChange={setQuery}
            value={query}
          />
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
            disabled={(selectedUsers.length === 0 && !query) || isPending}
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm flex items-center gap-2 "
            onClick={handleUserInvite}
          >
            {isPending && <Icons.Loader2 className="h-5 w-5 animate-spin" />}{" "}
            Invite
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
