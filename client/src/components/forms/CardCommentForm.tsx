"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  boardDescriptionSchema,
  boardDescriptionSchemaType,
} from "../../validation/board-description";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
  useSearchParams,
  useRouter,
  useParams,
  redirect,
} from "next/navigation";
import { useTransition } from "react";
import { createComment } from "@/app/_actions/card";
import { Icons } from "@/components/Icons";
import { useSocketStore } from "@/lib/store/socket-store";
import { useGenerationStore } from "@/lib/store/popups-store";
import ObjectID from "bson-objectid";
import { addComment } from "@/lib/DndFunc/card";
import { verifyUserAuth } from "@/app/_actions/board";

export const CardCommentForm = () => {
  const { user } = useUser();
  const params = useParams();
  const searchParams = useSearchParams();
  const { socket } = useSocketStore();
  const { initialData, setInitialData } = useGenerationStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<boardDescriptionSchemaType>({
    resolver: zodResolver(boardDescriptionSchema),
    defaultValues: {
      description: "",
    },
  });
  const onSubmit = async (data: boardDescriptionSchemaType) => {
    const cardId = searchParams.get("cardId") as string;
    const objId = new ObjectID().toHexString();
    if (!user) redirect("/sing-in");
    const newComment = {
      id: objId,
      text: data.description,
      createdAt: new Date(),
      userId: user.id,
      user: {
        id: user.id,
        name:
          user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
        boardId: params.boarId as string,
        email: user?.emailAddresses[0].emailAddress,
        commentId: objId,
      },
    };
    socket.emit("comment:add", {
      data: {
        cardId,
        comment: newComment,
      },
    });
    setInitialData(addComment(cardId, newComment, initialData));
    form.reset();
    startTransition(async () => {
      try {
        await createComment({ ...data, cardId, commentId: objId });
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
              Comment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
