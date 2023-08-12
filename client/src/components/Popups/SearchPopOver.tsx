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
import { useDebounce } from "use-debounce";
import { Icons } from "../Icons";

type SearchDataResults = {
  category: string;
  items: ItemsData[];
};

type ItemsData = {
  id: number;
  name: string;
  image: string;
};

export const SearchPopOver = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [isPending, setIsPending] = useTransition();
  const [value] = useDebounce(search, 500);
  const [data, setData] = useState<SearchDataResults[] | null>([]);
  const searchHandler = () => {
    setIsPending(async () => {
      console.log(search);
      /* const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${Math.floor(
          Math.random() * 100
        )}`
      );
      console.log(await response.json()); */
      /* const data = await response.json();
      setData(data.items); */
    });
  };
  const handleSectionClick = useCallback((callback: () => void) => {
    setIsOpen(false);
    callback();
  }, []);
  useEffect(() => {
    if (!value) setData(null);
    else {
      searchHandler();
    }
  }, [value]);
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
            data?.map((category) => (
              <CommandGroup heading="repositories" key={category.category}>
                {category.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      handleSectionClick(() => router.push(`board/${item.id}`))
                    }
                    className="flex items-center gap-x-2"
                  >
                    <Image src={""} alt="" height={32} width={32} />
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
