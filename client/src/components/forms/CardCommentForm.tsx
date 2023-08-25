"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  boardDescriptionSchema,
  boardDescriptionSchemaType,
} from "@/validation/board-description";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { addComment } from "@/app/_actions/card";
import { Icons } from "../Icons";

export const CardCommentForm = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
    defaultValues: {
      description: "",
    },
  });
  const onSubmit = (data: boardDescriptionSchemaType) => {
    const cardId = searchParams.get("cardId") as string;
    startTransition(async () => {
      try {
        await addComment({ ...data, cardId });
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className="px-[14px] py-3 rounded-xl shadow-outline-black-xs flex gap-x-3 ">
      <Avatar className="rounded-lg">
        <AvatarImage
          src={user?.imageUrl}
          alt={user?.username ?? ""}
          loading="lazy"
          className="object-cover"
        />
        <AvatarFallback>{user?.username?.split("")[0]}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form
          className="grid w-full gap-y-2"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Textarea
                  placeholder="Write a comment..."
                  className="resize-none border-none "
                  {...field}
                />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-xl px-6 py-2 disabled:bg-[#BDBDBD] flex items-center gap-2 disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
              disabled={isPending}
            >
              {isPending ? (
                <Icons.Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
