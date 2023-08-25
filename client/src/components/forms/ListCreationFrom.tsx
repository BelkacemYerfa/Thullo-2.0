"use client";

import { Form, FormItem, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cardSchema, cardSchemaType } from "@/validation/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGenerationStore } from "@/lib/store/Store";
import { addList } from "@/app/_actions/list";
import { useTransition } from "react";
import { Icons } from "../Icons";
import { useRouter } from "next/navigation";

type ListCreationFormProps = {
  boardId: string;
};

export const ListCreationForm = ({ boardId }: ListCreationFormProps) => {
  const { setNewList } = useGenerationStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: cardSchemaType) => {
    startTransition(async () => {
      try {
        await addList({ ...data, id: boardId });
        setNewList(false);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
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
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] flex items-center gap-2 disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            disabled={isPending || !form.formState.isValid}
          >
            {isPending && <Icons.Loader2 className="h-5 w-5 animate-spin" />}
            Add List
          </Button>
        </div>
      </form>
    </Form>
  );
};
