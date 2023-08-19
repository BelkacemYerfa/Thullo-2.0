"use client";

import { Input } from "../ui/input";
import { Icons } from "../Icons";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listNameSchema, listNameSchemaType } from "@/validation/list-name";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { ListDeletePopOver } from "../Popups/ListDeletePopOver";
import { useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { updateListName } from "@/app/_actions/list";

type ListNameChangeFormProps = {
  title: string;
  listId: string;
};

export const ListNameChangeForm = ({
  title,
  listId,
}: ListNameChangeFormProps) => {
  const [name, setName] = useState<string>(title);
  const { ref, rename, setRename } = useOutsideClick<HTMLFormElement>();
  const form = useForm<listNameSchemaType>({
    resolver: zodResolver(listNameSchema),
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleRename = () => {
    setRename(true);
    setIsOpen(false);
  };
  const onSubmit = async (data: listNameSchemaType) => {
    setName(data.name);
    await updateListName({ ...data, id: listId });
    setRename(false);
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
                <Input placeholder={name} {...field} className="w-full " />
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
      <h3 className="text-sm text-[#333333] font-medium ">{name}</h3>
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
