"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteList } from "@/app/_actions/list";
import { useTransition } from "react";
import { Icons } from "@/components/Icons";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";

type ListDeletePopOverProps = {
  listId: string;
};

export const ListDeletePopOver = ({ listId }: ListDeletePopOverProps) => {
  const router = useRouter();
  const {
    ref: DialogRef,
    rename: isDialogOpen,
    setRename: setIsDialogOpen,
  } = useOutsideClick<HTMLDivElement>();
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteList(listId);
        setIsDialogOpen(false);
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger className="w-full">
        <Button className="py-2 px-3 flex justify-start  cursor-default duration-200 w-full ease-linear text-[#828282] text-sm rounded-lg bg-transparent hover:bg-[#EB5757] hover:text-white">
          Delete this list
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent ref={DialogRef}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this List
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full flex items-center gap-1 justify-center md:justify-end">
          <AlertDialogCancel
            className="py-2 px-3 flex m-0 justify-start  cursor-default duration-200  ease-linear  text-sm rounded-lg bg-[#828282] hover:bg-[#828282] text-white hover:text-white w-fit"
            disabled={isPending}
          >
            Cancel
          </AlertDialogCancel>
          <Button
            className="py-2 px-3 flex justify-start  cursor-default duration-200  ease-linear  text-sm rounded-lg bg-[#EB5757] hover:bg-[#EB5757] text-white hover:text-white w-fit"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : null}
            Continue
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
