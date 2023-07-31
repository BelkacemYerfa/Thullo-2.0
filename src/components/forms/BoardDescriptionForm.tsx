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

type BoardDescriptionFormProps = {
  isDescriptionFormOpen: boolean;
  setIsDescriptionFormOpen: (value: boolean) => void;
};

export const BoardDescriptionForm = ({
  isDescriptionFormOpen,
  setIsDescriptionFormOpen,
}: BoardDescriptionFormProps) => {
  const [value, setValue] = useState<string>("");
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
  });
  const onSubmit = (data: boardDescriptionSchemaType) => {
    const { description } = data;
    setValue(description ?? "");
    setIsDescriptionFormOpen(false);
  };
  return (
    <>
      {value && !isDescriptionFormOpen ? (
        <p>{form.getValues("description")}</p>
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
            <div className="space-x-2">
              <Button
                type="submit"
                className="rounded-xl bg-[#219653] hover:bg-[#219653] py-1 px-3"
              >
                Save
              </Button>
              <Button
                type="button"
                className="rounded-xl text-[#828282] bg-transparent hover:bg-transparent py-1 px-3"
                onClick={() => setIsDescriptionFormOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};
