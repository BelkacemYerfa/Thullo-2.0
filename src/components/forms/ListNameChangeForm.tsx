"use client";

import { useGenerationStore } from "@/lib/store/Store";
import { Input } from "../ui/input";
import { Icons } from "../Icons";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listNameSchema, listNameSchemaType } from "@/validation/list-name";
import { useState } from "react";

export const ListNameChangeForm = () => {
  const [name, setName] = useState<string>("Tasks");
  const { rename, setRename } = useGenerationStore();
  const form = useForm<listNameSchemaType>({
    resolver: zodResolver(listNameSchema),
  });
  const onSubmit = (data: listNameSchemaType) => {
    setName(data.name);
    setRename(false);
  };
  return !rename ? (
    <h3 className="text-sm text-[#333333] font-medium ">{name}</h3>
  ) : (
    <Form {...form}>
      <form
        className="flex items-center gap-x-3 w-full"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <Input placeholder={name} {...field} className="w-full" />
            </FormItem>
          )}
        />
        <button type="submit">
          <Icons.Check className="h-5 w-5" />
          {""}
        </button>
      </form>
    </Form>
  );
};
