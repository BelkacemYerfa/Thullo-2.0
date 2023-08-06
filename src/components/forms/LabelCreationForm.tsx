import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  labelCreationSchema,
  labelCreationSchemaType,
} from "@/validation/label-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { ScrollArea } from "../ui/scroll-area";

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
  const [badges, setBadges] = useState<BadgeType[]>([
    {
      name: "hello",
      color: "#219653",
    },
  ]);
  const form = useForm<labelCreationSchemaType>({
    resolver: zodResolver(labelCreationSchema),
  });
  const onSubmit = (data: labelCreationSchemaType) => {
    console.log(data);
    setBadges([...badges, data]);
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
                  className={` w-12 h-7 rounded cursor-pointer`}
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="radio"
                    className="opacity-0 w-full h-full cursor-pointer checked:border-black border-solid border-2 checked:border-opacity-100 "
                    {...field}
                    value={color}
                  />
                </label>
              ))}
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <h3 className="flex items-center gap-x-2 text-[#BDBDBD] text-xs">
            <Icons.Tags className="h-4 w-4" />
            Available
          </h3>
          <div className="w-full h-14">
            <ScrollArea className="h-full w-full">
              <div className="flex items-center flex-wrap gap-1">
                {badges.map((badge) => (
                  <Badge
                    key={badge.color + badge.name}
                    className={cn(
                      `bg-[#D5E6FB] hover:bg-[#D5E6FB] py-1 px-2 text-xs font-medium  cursor-default`
                    )}
                    style={{ color: badge.color }}
                  >
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <Button
            type="submit"
            className="bg-[#2F80ED] hover:bg-[#2F80ED] rounded-lg px-6 py-2 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm "
            disabled={!form.formState.isValid}
          >
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
