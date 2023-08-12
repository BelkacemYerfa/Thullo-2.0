import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

export const ListDeletePopOver = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button className="py-2 px-3 flex justify-start  cursor-default duration-200 w-full ease-linear text-[#828282] text-sm rounded-lg bg-transparent hover:bg-[#EB5757] hover:text-white">
          Delete this list
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this List
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="py-2 px-3 flex justify-start  cursor-default duration-200  ease-linear  text-sm rounded-lg bg-[#828282] hover:bg-[#828282] text-white hover:text-white ">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="py-2 px-3 flex justify-start  cursor-default duration-200  ease-linear  text-sm rounded-lg bg-[#EB5757] hover:bg-[#EB5757] text-white hover:text-white ">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
