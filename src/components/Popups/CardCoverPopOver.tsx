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
import { useCallback, useEffect, useState, useTransition } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { searchPhotos } from "@/lib/unsplash-api/searchPhotos";
import { ScrollArea } from "../ui/scroll-area";
import { useDebounce } from "use-debounce";
import { Skeleton } from "../ui/skeleton";

type SearchDataResults = {
  image: string;
  blurDataURL: string;
};

export const CardCoverPopOver = () => {
  const [query, setQuery] = useState<string>("nature");
  const [images, setImages] = useState<string[]>([]);
  const [isPending, setIsPending] = useTransition();
  const [value] = useDebounce(query, 500);
  const handleSearchImage = useCallback(() => {
    setIsPending(async () => {
      /* if (!query) return;
      const results = await searchPhotos(query, 1, 12);
      console.log(results?.results[0]?.urls.full);
      let images: string[] = [];
      results?.results?.map((result: any) => {
        images.push(result?.urls?.full);
      });
      console.log(images);
      if (!images.length) {
        setImages([]);
        return;
      }
      setImages(images); */
    });
  }, [value]);
  useEffect(() => {
    handleSearchImage();
  }, [value]);
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
        className="rounded-xl py-2 px-3 space-y-3 w-64"
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
          <div className=" my-1 h-56">
            <ScrollArea className="h-full w-full ">
              <div className="max-w-[90%] mx-auto flex items-center gap-2 flex-wrap">
                {isPending
                  ? [...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="h-[60px] w-[60px] rounded" />
                    ))
                  : images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => console.log("selected")}
                        className={cn(
                          "cursor-pointer aria-selected:bg-transparent "
                        )}
                      >
                        <Image
                          src={image}
                          alt={`${image} image`}
                          height={60}
                          width={60}
                          className="h-[60px] w-[60px] rounded border-black border-solid border object-cover"
                          quality={100}
                        />
                      </div>
                    ))}
              </div>
            </ScrollArea>
          </div>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
