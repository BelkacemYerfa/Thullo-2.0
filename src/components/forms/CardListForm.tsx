"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema, cardSchemaType } from "@/validation/card";
import { motion, AnimatePresence } from "framer-motion";

export const CardListForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
  });
  const onSubmit = (data: cardSchemaType) => {
    console.log(data);
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };
  const formVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Form {...form}>
            <motion.form
              layout="size"
              ref={formRef}
              variants={formVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={` overflow-hidden p-3 border space-y-2 border-[#E0E0E0] rounded-xl shadow-outline-black-xs bg-white`}
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      className="border-none p-1 h-7"
                      placeholder="Enter a title for this card..."
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "rounded-lg text-white py-1 px-3 bg-[#219653] hover:bg-[#219653] w-fit"
                )}
                disabled={!form.formState.isValid}
              >
                Save
              </Button>
            </motion.form>
          </Form>
        )}
      </AnimatePresence>
      <Button
        className={cn(
          "flex items-center justify-between text-sm text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] w-80 rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed "
        )}
        disabled={isOpen}
        onClick={handleOpen}
      >
        Add another card
        <Icons.Plus className="h-5 w-5" />
      </Button>
    </>
  );
};
