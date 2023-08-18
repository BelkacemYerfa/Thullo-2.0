"use client";

import {
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
import { useDebounce } from "@/hooks/useDebounce";
import { Icons } from "../Icons";
import { searchForBoards } from "@/app/_actions/board";

export type Results = {
  category: string;
  items: Items;
}[];

export type Items = Pick<board, "id" | "name" | "image">[];

export const SearchPopOver = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [data, setData] = useState<Results | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery.length === 0) setData(null);

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const results = await searchForBoards(debouncedQuery);
        setData(results);
      });
    }
  }, [debouncedQuery]);

  const handleSelect = useCallback((callback: () => unknown) => {
    setIsOpen(false);
    callback();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <>
      <div
        className="p-1 rounded-lg flex items-center justify-between text-sm font-medium w-fit xl:w-80 border-[#E0E0E0] border-solid border cursor-pointer "
        onClick={() => setIsOpen(true)}
      >
        <span className="px-3">
          <p className="text-[#BDBDBD]">Keyword...</p>
        </span>
        <span className="hidden md:flex bg-[#2F80ED] text-white rounded-lg py-2 px-4">
          Search
        </span>
        <span className="flex md:hidden bg-[#2F80ED] text-white rounded-lg p-2">
          <Icons.SearchIcon className="h-5 w-5" />
        </span>
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="keyword..."
          value={query}
          onValueChange={setQuery}
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
            data?.map((group) => (
              <CommandGroup heading={group.category} key={group.category}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      handleSelect(() => router.push(`/board/${item.id}`))
                    }
                    className="flex items-center gap-x-2"
                  >
                    <Image
                      src={item.image[0].fileUrl}
                      alt={item.name}
                      height={32}
                      width={32}
                      className="rounded-lg object-cover h-8 w-8 "
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
