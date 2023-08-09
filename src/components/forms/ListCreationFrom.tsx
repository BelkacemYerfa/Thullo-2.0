"use client";

import { Form, FormItem, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cardSchema, cardSchemaType } from "@/validation/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerationStore } from "@/lib/store/Store";

export const ListCreationForm = () => {
  const { setNewList } = useGenerationStore();
  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
  });
  const onSubmit = (data: cardSchemaType) => {
    console.log(data);
    setNewList(false);
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
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            disabled={!form.formState.isValid}
          >
            Add List
          </Button>
        </div>
      </form>
    </Form>
  );
};
