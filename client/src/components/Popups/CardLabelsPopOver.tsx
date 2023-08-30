import { Icons } from "@/components/Icons";
import { LabelCreationForm } from "@/components/forms/LabelCreationForm";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CardLabelsPopOver = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-fit sm:w-full">
        <Button className="flex items-center w-fit sm:w-full justify-start gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg text-sm py-3 px-4">
          <Icons.Tags className="h-5 w-5" />
          <span className="hidden sm:flex">Labels</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-xl py-2 px-3 space-y-3 w-64"
        align="start"
      >
        <div className="text-sm ">
          <h3 className="text-[#4F4F4F] font-semibold">Labels</h3>
          <p className="text-[#828282]"> Select a name and a color</p>
        </div>
        <LabelCreationForm />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
