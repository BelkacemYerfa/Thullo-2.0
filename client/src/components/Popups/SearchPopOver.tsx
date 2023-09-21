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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Icons } from "@/components/Icons";
import { searchForBoards } from "@/app/_actions/board";
import { Board } from "@/types";

export type Results = {
  category: string;
  items: Items;
}[];

type Items = Pick<Board, "id" | "name">[];

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
    if (!isOpen) setQuery("");
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
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isPending ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group) => (
              <CommandGroup
                key={group.category}
                className="capitalize"
                heading={group.category}
              >
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      handleSelect(() => router.push(`/board/${item.id}`))
                    }
                    className=" text-sm rounded-lg cursor-pointer "
                  >
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
