import { UserProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Icons } from "../Icons";
import { ScrollArea } from "../ui/scroll-area";

export const UserProfilePopOver = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" flex items-center gap-x-[10px] px-3 py-2 rounded-lg duration-300 ease-linear cursor-default text-sm text-[#BDBDBD] hover:text-slate-900 hover:bg-slate-100 ">
          <Icons.User2 className="h-4 w-4 " />
          Profile
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </div>
      </DialogTrigger>
      <DialogContent className=" h-full w-full max-w-[95%] sm:max-w-[90%] xl:max-w-[70%] 2xl:max-w-[60%] bg-transparent shadow-none border-none p-2">
        <ScrollArea className="h-full max-w-full mx-auto">
          <UserProfile />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
