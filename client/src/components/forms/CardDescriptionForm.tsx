"use client";

import { useState, useTransition } from "react";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  boardDescriptionSchema,
  boardDescriptionSchemaType,
} from "../../validation/board-description";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCardDescription } from "@/app/_actions/card";
import { useSocketStore } from "@/lib/store/socket-store";
import { useGenerationStore } from "@/lib/store/popups-store";
import { editDescription } from "@/lib/DndFunc/card";

type CardDescriptionFormProps = {
  description: string;
  cardId: string;
};

export const CardDescriptionForm = ({
  description,
  cardId,
}: CardDescriptionFormProps) => {
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] = useState(false);
  const { initialData, setInitialData } = useGenerationStore();
  const { socket } = useSocketStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
    defaultValues: { description },
  });
  const onSubmit = (data: boardDescriptionSchemaType) => {
    const description = data.description;
    socket.emit("card:description", {
      data: {
        cardId,
        description,
      },
    });
    setInitialData(editDescription(description, cardId, initialData));
    setIsDescriptionFormOpen(!isDescriptionFormOpen);
    startTransition(async () => {
      try {
        await updateCardDescription({ ...data, cardId });
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-x-3">
        <div className="text-[#BDBDBD] flex items-center gap-[0.375rem]">
          <Icons.File className="h-4 w-4" />
          <h3 className="text-xs font-semibold">Description</h3>
        </div>
        {description !== "" && !isDescriptionFormOpen ? (
          <Button
            size={"sm"}
            className=" flex items-center gap-x-2 py-1 border border-[#BDBDBD] border-solid rounded-xl bg-transparent hover:bg-transparent text-[#828282]"
            onClick={() => setIsDescriptionFormOpen(!isDescriptionFormOpen)}
          >
            <Icons.Pencil className="h-4 w-4" />
            Edit
          </Button>
        ) : null}
      </div>
      <>
        {description !== "" && !isDescriptionFormOpen ? (
          <p className="max-w-full break-all max-h-[20rem] overflow-y-auto">
            {description}
          </p>
        ) : (
          <Form {...form}>
            <form
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
              <div className="flex items-center gap-2 ">
                <Button
                  type="submit"
                  size={"sm"}
                  className="flex items-center gap-2 rounded-xl bg-[#219653] hover:bg-[#219653] py-1 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
                  disabled={isPending || !form.formState.isValid}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="rounded-xl text-[#828282] bg-transparent hover:bg-transparent py-1 px-3"
                  disabled={!description || isPending}
                  onClick={() =>
                    setIsDescriptionFormOpen(!isDescriptionFormOpen)
                  }
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        )}
      </>
    </div>
  );
};
