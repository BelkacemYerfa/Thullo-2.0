import { Icons } from "../Icons";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const BoardSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center gap-x-[10px] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg  text-sm py-3 px-4 ">
          <Icons.MoreHorizontal className="h-5 w-5" />
          Show Menu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <p>this is sheet</p>
      </SheetContent>
    </Sheet>
  );
};
