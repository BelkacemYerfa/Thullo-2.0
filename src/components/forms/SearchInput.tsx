"use client";

import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, searchSchemaType } from "@/validation/search";

export const SearchInput = () => {
  const form = useForm<searchSchemaType>({
    resolver: zodResolver(searchSchema),
  });
  const onSubmit = () => {};
  return (
    <Form {...form}>
      <form action="">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
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
