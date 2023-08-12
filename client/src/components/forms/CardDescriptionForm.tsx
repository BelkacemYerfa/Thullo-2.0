"use client";

import { useState } from "react";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  boardDescriptionSchema,
  boardDescriptionSchemaType,
} from "@/validation/board-description";
import { zodResolver } from "@hookform/resolvers/zod";

export const CardDescriptionForm = () => {
  const [value, setValue] = useState<string>("");
  const [isDescriptionFormOpen, setIsDescriptionFormOpen] =
    useState<boolean>(false);
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
  });
  const onSubmit = (data: boardDescriptionSchemaType) => {
    console.log(data);
    console.log("hello");
    setValue(data.description ?? "");
    setIsDescriptionFormOpen(true);
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-x-3">
        <div className="text-[#BDBDBD] flex items-center gap-x-[6px]">
          <Icons.File className="h-4 w-4" />
          <h3 className="text-xs font-semibold">Description</h3>
        </div>
        {isDescriptionFormOpen ? (
          <Button
            className=" flex items-center gap-x-2 px-3 py-1 border border-[#BDBDBD] border-solid rounded-lg bg-transparent hover:bg-transparent text-[#828282]"
            onClick={() => setIsDescriptionFormOpen(!isDescriptionFormOpen)}
          >
            <Icons.Pencil className="h-4 w-4" />
            Edit
          </Button>
        ) : null}
      </div>
      <>
        {value && isDescriptionFormOpen ? (
          <p className="max-w-full break-all">
            {form.getValues("description")}
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
              <div className="space-x-2">
                <Button
                  type="submit"
                  className="rounded-xl bg-[#219653] hover:bg-[#219653] py-1 px-3 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
                  disabled={!form.formState.isValid}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="rounded-xl text-[#828282] bg-transparent hover:bg-transparent py-1 px-3"
                  disabled={!value}
                  onClick={() => setIsDescriptionFormOpen(true)}
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
