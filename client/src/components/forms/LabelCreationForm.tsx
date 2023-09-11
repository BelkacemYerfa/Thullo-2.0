import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  labelCreationSchema,
  labelCreationSchemaType,
} from "../../validation/label-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addLabel, getLabels } from "@/app/_actions/card";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const Colors = [
  "#219653",
  "#F2C94C",
  "#F2994A",
  "#EB5757",
  "#2F80ED",
  "#56CCF2",
  "#6FCF97",
  "#333333",
  "#4F4F4F",
  "#828282",
  "#BDBDBD",
  "#E0E0E0",
];

type BadgeType = {
  name: string;
  color: string;
};

export const LabelCreationForm = () => {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("cardId") as string;
  const [isPending, startTransition] = useTransition();
  const form = useForm<labelCreationSchemaType>({
    resolver: zodResolver(labelCreationSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });
  const { data: labels, isLoading } = useQuery(["labels", cardId], async () => {
    return await getLabels(cardId);
  });
  const onSubmit = (data: labelCreationSchemaType) => {
    startTransition(async () => {
      try {
        await addLabel({ ...data, cardId });
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
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Input {...field} placeholder="Label..." />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center gap-2 flex-wrap space-y-0">
              {Colors.map((color) => (
                <label
                  key={color}
                  className={`w-[50px] h-7 rounded cursor-pointer`}
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="radio"
                    className="opacity-0 w-full h-full cursor-pointer border-solid border-2 checked:border-opacity-100 "
                    {...field}
                    onSelect={() => {
                      console.log(color);
                    }}
                    value={color}
                  />
                </label>
              ))}
            </FormItem>
          )}
        />
        {isLoading ? (
          <div className="space-y-2">
            <div className="flex items-center gap-x-2 ">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="w-20 h-4" />
            </div>
            <div className="flex items-center gap-1 w-full flex-wrap ">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className=" h-4 w-16 " />
              ))}
            </div>
          </div>
        ) : labels?.length !== 0 ? (
          <div className="space-y-2">
            <h3 className="flex items-center gap-x-2 text-[#BDBDBD] text-xs">
              <Icons.Tags className="h-4 w-4" />
              Available
            </h3>
            <div className="w-full h-10">
              <ScrollArea className="h-full w-full">
                <div className="flex items-center flex-wrap gap-1">
                  {labels?.map((badge) => (
                    <Badge
                      key={badge.id}
                      className={cn(
                        `hover:bg-[#D5E6FB] py-1 px-2 text-xs font-medium  cursor-default text-white rounded-xl `
                      )}
                      style={{ backgroundColor: badge.color }}
                    >
                      {badge.name}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-center w-full">
          <Button
            type="submit"
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm flex items-center gap-2 "
            disabled={isPending || !form.formState.isValid}
          >
            {isPending ? (
              <Icons.Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
