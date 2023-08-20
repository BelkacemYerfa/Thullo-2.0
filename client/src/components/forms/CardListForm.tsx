"use client";

import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardSchema, cardSchemaType } from "@/validation/card";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { addCard } from "@/app/_actions/card";

type CardListFormProps = {
  listId: string;
};

export const CardListForm = ({ listId }: CardListFormProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const {
    ref,
    rename: isOpen,
    setRename: setIsOpen,
  } = useOutsideClick<HTMLFormElement>();
  const form = useForm<cardSchemaType>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: cardSchemaType) => {
    startTransition(async () => {
      try {
        await addCard({ ...data, listId });
        setIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (btnRef.current) {
        btnRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 0);
  };
  const formVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "circOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "tween",
        duration: 0.15,
        ease: "circIn",
      },
    },
  };
  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <Form {...form}>
            <motion.form
              layout="size"
              ref={ref}
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
              <div className="flex items-center gap-2">
                <Button
                  type="submit"
                  className={cn(
                    "flex items-center gap-2 rounded-xl bg-[#219653] hover:bg-[#219653] py-1 px-3 disabled:bg-[#BDBDBD] disabled:cursor-not-allowed disabled:hover:bg-[#BDBDBD] disabled:opacity-70 text-sm"
                  )}
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? (
                    <Icons.Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Save
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "rounded-lg text-[#333333] py-1 px-3 w-fit hover:bg-transparent "
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </motion.form>
          </Form>
        ) : null}
      </AnimatePresence>
      <Button
        ref={btnRef}
        className={cn(
          `${
            isOpen ? "static mt-3" : "sticky bottom-0"
          } flex items-center justify-between text-sm text-[#2F80ED] font-medium py-2 px-3 bg-[#DAE4FD] w-full rounded-lg hover:bg-[#DAE4FD] disabled:cursor-not-allowed `
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
