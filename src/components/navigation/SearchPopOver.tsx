"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const SearchPopOver = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isPending, setIsPending] = useTransition();
  const [data, setData] = useState<any[]>([]);
  const searchHandler = () => {
    setIsPending(async () => {
      console.log(search);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc`
      );
      const data = await response.json();
      setData(data.items);
    });
  };
  useEffect(() => {
    searchHandler();
  }, [search]);
  return (
    <>
      <div
        className="p-1 rounded-lg flex items-center justify-between text-sm font-medium w-96 border-[#E0E0E0] border-solid border "
        onClick={() => setIsOpen(true)}
      >
        <span className="px-3">
          <p className="text-[#BDBDBD]">Keyword...</p>
        </span>
        <span className="bg-[#2F80ED] text-white rounded-lg py-2 px-4">
          Search
        </span>
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="keyword..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "text-center text-sm p-6")}
          >
            No results found.
          </CommandEmpty>

          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            <CommandGroup heading="repositories">
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => router.push(`/board/${item.id}`)}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
