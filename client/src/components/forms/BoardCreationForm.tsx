"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { BoardFormSchema, BoardFormSchemaType } from "../../validation/search";
import { UploadImageForm } from "./UploadImageForm";
import { useGenerationStore } from "@/lib/store/popups-store";
import { addBoard } from "@/app/_actions/board";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { Icons } from "@/components/Icons";

export const BoardCreationForm = () => {
  const { setBoardCard } = useGenerationStore();
  const [isPending, setIsPending] = useTransition();
  const [image, setImage] = useState<File[]>([]);
  const [preview, setPreview] = useState<string>("");
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<BoardFormSchemaType>({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data: BoardFormSchemaType) => {
    setIsPending(async () => {
      try {
        const Image = await startUpload(image).then((res) => {
          const response = {
            fileKey: res?.[0].fileKey,
            fileUrl: res?.[0].fileUrl,
          };
          return response ?? null;
        });
        await addBoard({ ...data, Image });
        setBoardCard(false);
        toast.success("Board created successfully");
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <UploadImageForm
          image={image}
          preview={preview}
          setPreview={(image) => setPreview(image)}
          setImage={(image) => setImage(image)}
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
        <div className="flex items-center justify-end">
          <Button
            type="submit"
            className="flex items-center gap-2 bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            disabled={
              isPending || !form.formState.isValid || image.length === 0
            }
          >
            {isPending ? (
              <Icons.Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icons.Plus className="w-4 h-4" />
            )}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
