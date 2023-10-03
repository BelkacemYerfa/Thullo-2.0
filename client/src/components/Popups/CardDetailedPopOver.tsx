"use client";

import { Drawer } from "vaul";
import Link from "next/link";
import Image from "next/image";
import { CardDescriptionForm } from "@/components/forms/CardDescriptionForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardCommentForm } from "@/components/forms/CardCommentForm";
import { CommentsList } from "@/components/list/CommentsList";
import { Icons } from "@/components/Icons";
import { CardAssignedMembers } from "./AddUserCardActions";
import { CardLabelsPopOver } from "./CardLabelsPopOver";
import { Button } from "@/components/ui/button";
import { useEffect, useTransition } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { deleteCardMutation } from "@/app/_actions/card";
import { toast } from "sonner";
import { CardLabelsList } from "../list/CardLabelsList";
import { comments, labels } from "@/types";
import { useSocketStore } from "@/lib/store/socket-store";
import { useGenerationStore } from "@/lib/store/popups-store";
import { removeCard } from "@/lib/DndFunc/card";

type CardDetailedPopOverProps = {
  taskTitle: string;
  cardId: string;
  description: string;
  comments: comments[];
  labels: labels[];
  image: string | undefined;
  listName: string;
};
export const CardDetailedPopOver = ({
  taskTitle,
  cardId,
  description,
  image,
  comments,
  labels,
  listName,
}: CardDetailedPopOverProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { socket } = useSocketStore();
  const { initialData, setInitialData } = useGenerationStore();
  const { rename: isOpen, setRename: setIsOpen } =
    useOutsideClick<HTMLDivElement>();
  const handleOpen = () => {
    const currentPath = new URLSearchParams(searchParams?.toString());
    if (isOpen) currentPath.delete("cardId");
    else currentPath.set("cardId", cardId);
    router.push(`${pathname}?${currentPath.toString()}`);
  };
  const deleteCard = () => {
    if (!socket) return;
    socket.emit("card:delete", cardId);
    setInitialData(removeCard(cardId, initialData));
    toast.error("Task deleted successfully");
    handleOpen();
    startTransition(async () => {
      try {
        await deleteCardMutation(cardId);
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    const currentCard = searchParams?.get("cardId");
    if (currentCard) {
      if (currentCard !== cardId) setIsOpen(false);
      else setIsOpen(true);
    }
  }, [searchParams, setIsOpen, cardId]);
  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpen} shouldScaleBackground>
      <Drawer.Trigger className="cursor-pointer">{taskTitle}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed z-[5] inset-0 bg-black/40 " />
        <Drawer.Content className="bg-white/90 backdrop-blur-sm absolute z-[7] h-[85%] md:h-[90%] w-full bottom-0 left-0 right-0 rounded-t-xl overflow-hidden ">
          <ScrollArea className="h-full w-full ">
            <div className=" h-full pb-4 bg-white w-full md:w-3/5 m-auto shadow-outline-black ">
              <div className="sticky top-0 flex justify-center bg-white py-4 shadow-outline-black z-[5] ">
                <Link href={pathname ?? "/"}>
                  <Drawer.Close>
                    <div className="max-w-full mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
                  </Drawer.Close>
                </Link>
              </div>
              <div className=" max-w-[95%] mx-auto max-h-full space-y-6 mt-2 ">
                {image ? (
                  <AspectRatio ratio={16 / 5}>
                    <Image
                      src={image}
                      alt={`${name} picture `}
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
                        <span className="text-[#333333]">{listName}</span>
                      </p>
                    </div>
                    <CardLabelsList labels={labels} cardId={cardId} />
                    <CardDescriptionForm
                      cardId={cardId}
                      description={description}
                    />
                    <div className="space-y-4">
                      <CardCommentForm />
                      <CommentsList comments={comments} cardId={cardId} />
                    </div>
                  </div>
                  <div className="basis-full md:basis-1/4 space-y-2">
                    <h3 className="flex items-center text-xs gap-x-2 text-[#BDBDBD] font-semibold">
                      <Icons.User2 className="h-4 w-4" />
                      Actions
                    </h3>
                    <div className="flex flex-row items-center md:flex-col gap-3 ">
                      <div className="p-0 relative flex md:flex-col items-center gap-2 w-full">
                        <CardAssignedMembers />
                        <CardLabelsPopOver labels={labels} />
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
