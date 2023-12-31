"use client";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema, cardSchemaType } from "../../validation/card";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { createCard } from "@/app/_actions/card";
import { addCard } from "@/lib/DndFunc/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toast } from "sonner";
import { useSocketStore } from "@/lib/store/socket-store";
import { useGenerationStore } from "@/lib/store/popups-store";
import ObjectID from "bson-objectid";
import { Task } from "@/types";

type CardListFormProps = {
  listId: string;
};

export const CardListForm = ({ listId }: CardListFormProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const { socket } = useSocketStore();
  const { initialData, setInitialData } = useGenerationStore();
  const {
    ref,
    rename: isOpen,
    setRename: setIsOpen,
  } = useOutsideClick<HTMLFormElement>();
  const [parent] = useAutoAnimate();
  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: cardSchemaType) => {
    const objId = new ObjectID().toHexString();
    const currentIndex = initialData.columns[listId]?.taskIds.length;
    const newCard: Task = {
      content: data.name,
      colId: listId,
      id: objId,
      description: "",
      comments: [],
      labels: [],
      image: "",
      index: String(currentIndex),
    };
    socket.emit("card:add", {
      card: {
        ...newCard,
      },
    });
    setInitialData(addCard(newCard, initialData));
    toast.success("Task added successfully");
    setIsOpen(false);
    startTransition(async () => {
      try {
        await createCard({
          ...data,
          listId,
          id: objId,
          index: String(currentIndex),
        });
        form.reset();
      } catch (error) {
        console.log(error);
      }
    });
  };
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (btnRef.current) {
        btnRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 0);
  };

  return (
    <>
      <div ref={parent}>
        {isOpen && (
          <Form {...form}>
            <form
              ref={ref}
              className={` overflow-hidden p-3 border space-y-2 border-[#E0E0E0] rounded-xl shadow-outline-black-xs bg-white`}
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      className="border-none p-1 h-7"
                      placeholder="Enter a title for this card..."
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  size={"sm"}
                  className={cn(
                    "flex items-center gap-2 rounded-xl bg-[#219653] hover:bg-[#219653] px-3 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
                  )}
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? (
                    <Icons.Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "rounded-lg text-[#333333] py-1 px-3 w-fit hover:bg-transparent "
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
      <Button
        ref={btnRef}
        className={cn(
          `${
            isOpen ? "static mt-3" : "sticky bottom-0"
          } flex items-center justify-between text-sm text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] w-full rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed `
        )}
        disabled={isOpen}
        onClick={handleOpen}
      >
        Add another card
        <Icons.Plus className="h-5 w-5" />
      </Button>
    </>
  );
};
