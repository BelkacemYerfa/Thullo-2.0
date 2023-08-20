"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import {
  boardDescriptionSchemaType,
  boardDescriptionSchema,
} from "@/validation/board-description";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icons } from "../Icons";
import { useTransition } from "react";
import { updateBoardDescription } from "@/app/_actions/board";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type BoardDescriptionFormProps = {
  description: string;
  boardId: string;
};

export const BoardDescriptionForm = ({
  description,
  boardId,
}: BoardDescriptionFormProps) => {
  const [isPending, startTransition] = useTransition();
  const {
    ref,
    rename: isDescriptionOpen,
    setRename: setIsDescriptionOpen,
  } = useOutsideClick<HTMLFormElement>();
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
    defaultValues: {
      description: description,
    },
  });
  const onSubmit = (data: boardDescriptionSchemaType) => {
    startTransition(async () => {
      try {
        await updateBoardDescription({ ...data, id: boardId });
        setIsDescriptionOpen(!isDescriptionOpen);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className="space-y-2 ">
      <div className="flex items-center gap-x-3">
        <div className="text-[#BDBDBD] flex items-center gap-x-[6px]">
          <Icons.File className="h-4 w-4" />
          <h3 className="text-xs font-semibold">Description</h3>
        </div>
        {!isDescriptionOpen ? (
          <Button
            className=" flex items-center gap-x-2 px-3 py-1 border border-[#BDBDBD] border-solid rounded-lg bg-transparent hover:bg-transparent text-[#828282]"
            disabled={isPending}
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
          >
            <Icons.Pencil className="h-4 w-4" />
            Edit
          </Button>
        ) : null}
      </div>
      {isDescriptionOpen ? (
        <Form {...form}>
          <form
            ref={ref}
            className="grid space-y-2 max-w-[97%] m-auto"
            onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Textarea className="resize-none h-52 " {...field} />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#219653] hover:bg-[#219653] py-1 px-3 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
                disabled={!form.formState.isValid || isPending}
              >
                {isPending ? (
                  <Icons.Loader2 className="h-4 w-4 animate-spin " />
                ) : null}
                Save
              </Button>
              <Button
                type="button"
                className="rounded-xl text-[#828282] bg-transparent hover:bg-transparent py-1 px-3"
                disabled={!description || isPending}
                onClick={() => setIsDescriptionOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className={`max-w-full break-all`}>{description}</p>
      )}
    </div>
  );
};
