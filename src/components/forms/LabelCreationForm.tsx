import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  labelCreationSchema,
  labelCreationSchemaType,
} from "@/validation/label-creation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

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

export const LabelCreationForm = () => {
  const form = useForm<labelCreationSchemaType>({
    resolver: zodResolver(labelCreationSchema),
  });
  const onSubmit = (data: labelCreationSchemaType) => {
    console.log(data);
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
            <FormItem className="flex items-center gap-y-1 gap-x-2 flex-wrap">
              {Colors.map((color) => (
                <label
                  key={color}
                  className={` w-12 h-7 rounded  cursor-pointer`}
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="radio"
                    className="opacity-0 w-full h-full"
                    {...field}
                    value={color}
                  />
                </label>
              ))}
            </FormItem>
          )}
        />
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
