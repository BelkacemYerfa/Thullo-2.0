"use client";

import { Drawer } from "vaul";
import Link from "next/link";
import Image from "next/image";
import { CardDescriptionForm } from "../forms/CardDescriptionForm";
import { ScrollArea } from "../ui/scroll-area";
import { CardCommentForm } from "../forms/CardCommentForm";
import { CommentsList } from "../list/CommentsList";
import { Icons } from "../Icons";
import { CardAssignedMembers } from "./AddUserCardActions";
import { CardCoverPopOver } from "./CardCoverPopOver";
import { CardLabelsPopOver } from "./CardLabelsPopOver";
import { Button } from "../ui/button";
import { useEffect, useTransition } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { deleteCardMutation, getCardInfoWithList } from "@/app/_actions/card";

type CardDetailedPopOverProps = {
  taskTitle: string;
  cardId: string;
};

export const CardDetailedPopOver = ({
  taskTitle,
  cardId,
}: CardDetailedPopOverProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { data: card } = useQuery(["card", cardId], async () => {
    return await getCardInfoWithList(cardId);
  });
  console.log(card);
  const { rename: isOpen, setRename: setIsOpen } =
    useOutsideClick<HTMLDivElement>();
  const handleOpen = () => {
    setIsOpen(!isOpen);
    const currentPath = new URLSearchParams(Array.from(searchParams.entries()));
    if (isOpen) currentPath.delete("cardId");
    else currentPath.set("cardId", cardId);
    router.push(`${pathname}?${currentPath.toString()}`);
  };
  const deleteCard = () => {
    startTransition(async () => {
      try {
        await deleteCardMutation(cardId);
        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    if (searchParams.has("cardId")) {
      const cardId = searchParams.get("cardId");
      if (cardId) {
        if (cardId !== cardId) setIsOpen(true);
        else setIsOpen(true);
      }
    }
  }, []);
  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpen}>
      <Link href={`?cardId=${cardId}`}>
        <Drawer.Trigger className="cursor-pointer">{taskTitle}</Drawer.Trigger>
      </Link>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed z-[5] inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white/90 backdrop-blur-sm absolute z-[7] h-[85%] md:h-[90%] w-full bottom-0 left-0 right-0 rounded-t-xl overflow-hidden ">
          <ScrollArea className="h-full w-full ">
            <div className=" h-full pb-4 bg-white w-full md:w-3/5 m-auto shadow-outline-black ">
              <div className="sticky top-0 flex justify-center bg-white py-4 shadow-outline-black z-[5] ">
                <Link href={pathname}>
                  <Drawer.Close>
                    <div className="max-w-full mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                  </Drawer.Close>
                </Link>
              </div>
              <div className=" max-w-[95%] mx-auto max-h-full space-y-6 mt-2 ">
                {card?.image ? (
                  <AspectRatio ratio={16 / 5}>
                    <Image
                      src={card.image}
                      alt={`${card.name} picture `}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className=" rounded-xl object-cover "
                      quality={100}
                    />
                  </AspectRatio>
                ) : null}
                <div className="flex flex-col-reverse md:flex-row gap-5">
                  <div className=" basis-full md:basis-3/4 space-y-5 ">
                    <div className="space-y-2">
                      <Drawer.Title className="text-base ">
                        {taskTitle}
                      </Drawer.Title>
                      <p className="text-xs text-[#BDBDBD] font-semibold">
                        In list{" "}
                        <span className="text-[#333333]">
                          {card?.list.name}
                        </span>
                      </p>
                    </div>
                    <CardDescriptionForm
                      cardId={cardId}
                      description={card?.description}
                    />
                    <div className="space-y-4">
                      <CardCommentForm />
                      <CommentsList cardId={cardId} />
                    </div>
                  </div>
                  <div className="basis-full md:basis-1/4 space-y-2">
                    <h3 className="flex items-center text-xs gap-x-2 text-[#BDBDBD] font-semibold">
                      <Icons.User2 className="h-4 w-4" />
                      Actions
                    </h3>
                    <div className="flex flex-row items-center md:flex-col gap-3 ">
                      <div className="p-0 relative flex md:block items-center md:space-y-2 gap-x-2 w-full">
                        <CardAssignedMembers />
                        <CardLabelsPopOver />
                        <CardCoverPopOver />
                        <Button
                          variant={"destructive"}
                          className="flex justify-start items-center gap-x-[10px] duration-200 w-fit sm:w-full ease-linear rounded-lg text-sm py-3 px-4 bg-[#EB5757] text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={isPending}
                          onClick={deleteCard}
                        >
                          {isPending ? (
                            <Icons.Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Icons.Trash2 className="h-5 w-5" />
                          )}
                          <span className="hidden sm:flex">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
