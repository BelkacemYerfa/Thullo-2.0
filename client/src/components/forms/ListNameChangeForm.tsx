"use client";

import { useGenerationStore } from "@/lib/store/Store";
import { Input } from "../ui/input";
import { Icons } from "../Icons";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listNameSchema, listNameSchemaType } from "@/validation/list-name";
import { useState, LegacyRef, useRef, useEffect } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type ListNameChangeFormProps = {
  title: string;
};

export const ListNameChangeForm = ({ title }: ListNameChangeFormProps) => {
  const [name, setName] = useState<string>(title);
  const { ref, rename, setRename } = useOutsideClick<HTMLFormElement>();
  const form = useForm<listNameSchemaType>({
    resolver: zodResolver(listNameSchema),
  });
  const onSubmit = (data: listNameSchemaType) => {
    setName(data.name);
    setRename(false);
  };

  return rename ? (
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
  ) : (
    <h3 className="text-sm text-[#333333] font-medium ">{name}</h3>
  );
};
