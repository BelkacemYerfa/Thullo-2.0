"use client";

import { Input } from "@/components/ui/input";
import { Icons } from "@/components/Icons";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listNameSchema, listNameSchemaType } from "../../validation/list-name";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ListDeletePopOver } from "@/components/Popups/ListDeletePopOver";
import { useState, useTransition } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { updateListName } from "@/app/_actions/list";
import { experimental_useOptimistic as useOptimistic } from "react";
import { useSocketStore } from "@/lib/store/socket-store";
import { useGenerationStore } from "@/lib/store/popups-store";
import { editListName } from "@/lib/DndFunc/list";

type ListNameChangeFormProps = {
  title: string;
  listId: string;
};

export const ListNameChangeForm = ({
  title,
  listId,
  ...props
}: ListNameChangeFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { socket } = useSocketStore();
  const { initialData, setInitialData } = useGenerationStore();
  const { ref, rename, setRename } = useOutsideClick<HTMLFormElement>();
  const form = useForm<listNameSchemaType>({
    resolver: zodResolver(listNameSchema),
    defaultValues: { name: title },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleRename = () => {
    setRename(true);
    setIsOpen(false);
  };
  const onSubmit = (data: listNameSchemaType) => {
    socket.emit("list:edit", {
      id: listId,
      name: data.name,
    });
    setInitialData(editListName(data.name, listId, initialData));
    setRename(false);
    startTransition(async () => {
      try {
        await updateListName({ ...data, id: listId });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return rename ? (
    <>
      <Form {...form}>
        <form
          ref={ref}
          className="flex items-center gap-x-2 w-full"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input placeholder={title} className="w-full " {...field} />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div
        className="cursor-pointer text-[#EB5757]"
        onClick={() => setRename(false)}
      >
        <Icons.X className="h-5 w-5" />
      </div>
    </>
  ) : (
    <>
      <h3
        {...props}
        className={`text-sm text-[#333333] font-medium ${
          isPending ? "opacity-50" : ""
        } `}
      >
        {title}
      </h3>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger aria-label="open list settings">
          <Icons.MoreHorizontal className="h-5 w-5" />
        </PopoverTrigger>
        <PopoverContent
          className="p-1 space-y-1 max-w-[200px] rounded-xl"
          align="start"
        >
          <Button
            className="py-2 px-3 flex justify-start cursor-default duration-200 ease-linear text-[#828282] text-sm rounded-lg bg-transparent w-full hover:bg-[#F2F2F2]"
            onClick={handleRename}
          >
            Rename
          </Button>
          <Separator />
          <ListDeletePopOver listId={listId} />
        </PopoverContent>
      </Popover>
    </>
  );
};
