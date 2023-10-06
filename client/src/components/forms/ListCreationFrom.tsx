"use client";

import { Form, FormItem, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cardSchema, cardSchemaType } from "../../validation/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerationStore } from "@/lib/store/popups-store";
import { createList } from "@/app/_actions/list";
import { useTransition } from "react";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Column } from "@/types";
import ObjectID from "bson-objectid";
import { useSocketStore } from "@/lib/store/socket-store";
import { addList } from "@/lib/DndFunc/list";

type ListCreationFormProps = {
  boardId: string;
};

export const ListCreationForm = ({ boardId }: ListCreationFormProps) => {
  const { setNewList, initialData, setInitialData } = useGenerationStore();
  const { socket } = useSocketStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: cardSchemaType) => {
    const objId = new ObjectID().toHexString();
    const currentIndex = initialData.columnOrder.length;

    const newList: Column = {
      id: objId,
      title: data.name,
      taskIds: [],
      index: String(currentIndex),
    };
    socket.emit("list:add", { list: { ...newList } });
    setInitialData(addList(newList, initialData));
    toast.success("List added successfully");
    setNewList(false);
    startTransition(async () => {
      try {
        await createList({
          ...data,
          boardId,
          listId: objId,
          index: String(currentIndex),
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-2"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input placeholder="List name" {...field} />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] flex items-center gap-2 disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            disabled={isPending || !form.formState.isValid}
          >
            {isPending && <Icons.Loader2 className="h-5 w-5 animate-spin" />}
            Add List
          </Button>
        </div>
      </form>
    </Form>
  );
};
