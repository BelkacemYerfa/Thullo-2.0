"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BoardFormSchema, BoardFormSchemaType } from "@/validation/search";
import Image from "next/image";
import { UploadImageForm } from "./UploadImageForm";

export const BoardCreationForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const [image, setImage] = useState<string>("");
  const form = useForm<BoardFormSchemaType>({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data: BoardFormSchemaType) => {
    console.log("hello");
    setIsPending(async () => {
      console.log({ ...data, image });
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <UploadImageForm image={image} setImage={(image) => setImage(image)} />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-lg"
                  placeholder="Add board title"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-3 py-2 text-sm disabled:cursor-not-allowed"
          disabled={isPending || !form.formState.isValid}
        >
          + Create
        </Button>
      </form>
    </Form>
  );
};