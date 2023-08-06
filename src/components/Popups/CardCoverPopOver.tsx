import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "../ui/command";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";

export const CardCoverPopOver = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const handleSearchImage = useCallback(() => {
    console.log(query);
    setImages([]);
  }, [query]);
  useEffect(() => {
    handleSearchImage();
  }, [query]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full">
        <Button className="flex items-center w-full justify-start gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg text-sm py-3 px-4">
          <Icons.Wallpaper className="h-5 w-5" />
          Cover
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-72 rounded-xl py-2 px-3 space-y-3 "
      >
        <div className="space-y-1 text-sm">
          <h3 className="text-[#4F4F4F] font-semibold">Photo Search</h3>
          <p className="text-[#828282] ">Search Unsplash for photos</p>
        </div>
        <Command className="rounded-lg border border-solid border-[#E0E0E0] shadow-outline-navigation-md ">
          <CommandInput
            placeholder="Search framework..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandEmpty
            className={cn(true ? "hidden" : "text-center text-sm p-6")}
          >
            No Images Found
          </CommandEmpty>
          <CommandGroup className="flex items-center gap-x-2 gap-y-3 flex-wrap justify-center">
            {images.map((image, index) => (
              <CommandItem
                key={index}
                onSelect={() => {}}
                className={cn(
                  "p-1 text-[#333333] font-semibold flex items-center justify-between cursor-pointer aria-selected:bg-transparent "
                )}
              >
                <Image
                  src={image}
                  alt={`${image} image`}
                  height={50}
                  width={50}
                  className="rounded"
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
