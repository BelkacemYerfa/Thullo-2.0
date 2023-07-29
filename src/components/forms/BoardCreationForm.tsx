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
import { useTransition } from "react";
import { toast } from "sonner";
import { BoardFormSchema, BoardFormSchemaType } from "@/validation/search";
import Image from "next/image";

export const BoardCreationForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useTransition();
  const form = useForm<BoardFormSchemaType>({
    resolver: zodResolver(BoardFormSchema),
  });
  const onSubmit = (data: BoardFormSchemaType) => {
    setIsPending(async () => {
      console.log(data);
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {form.getValues("img") ? (
                  <div className="">
                    <Image
                      src={form.getValues("img")}
                      alt="image"
                      height={200}
                      width={200}
                      className="w-full rounded-lg"
                    />
                    <Input type="file" className="rounded-lg" {...field} />
                  </div>
                ) : (
                  <label className="w-full">
                    <div className="flex items-center justify-center flex-col pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <Input type="file" className="hidden" />
                  </label>
                )}
              </FormControl>
            </FormItem>
          )}
        />
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
          className="rounded-lg bg-[#2F80ED] disabled:cursor-not-allowed "
          disabled={isPending || !form.formState.isValid}
        >
          + Create
        </Button>
      </form>
    </Form>
  );
};
