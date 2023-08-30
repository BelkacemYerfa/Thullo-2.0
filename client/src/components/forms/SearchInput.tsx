"use client";

import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, searchSchemaType } from "@/validation/search";

export const SearchInput = () => {
  const form = useForm<searchSchemaType>({
    resolver: zodResolver(searchSchema),
  });
  const onSubmit = (data: searchSchemaType) => {
    const { search } = data;
    console.log(search);
  };
  return (
    <Form {...form}>
      <form
        className="grid"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="keyword..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
