import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { BoardDescriptionForm } from "@/components/forms/BoardDescriptionForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BoardUsers } from "../BordUsers";

type BoardSheetProps = {
  users: string[];
  title: string;
  boardId: string;
};

export const BoardSheet = async ({
  users,
  title,
  boardId,
}: BoardSheetProps) => {
  const user = await currentUser();
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-[0.625rem] text-[#828282] bg-[#F2F2F2] hover:bg-[#F2F2F2] rounded-lg  text-sm py-[0.625rem] px-3 ">
          <Icons.MoreHorizontal className="h-5 w-5" />
          Show Menu
        </div>
      </SheetTrigger>
      <SheetContent className="w-full px-2 py-6 flex flex-col gap-y-2">
        <SheetHeader className="px-3">
          <SheetTitle className="text-sm text-[#333333] font-semibold">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="px-3">
          <Separator />
        </div>
        <div className=" flex-1  overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className=" space-y-4">
              <div className="space-y-3">
                <div className="flex text-[#BDBDBD] items-center space-x-[6px]">
                  <Icons.User2 className="h-4 w-4" />
                  <p className="text-xs text-[#BDBDBD] font-semibold">
                    Made By
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-9 w-9 rounded-lg">
                    <AvatarImage
                      src={
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                      }
                      alt={user?.username ?? ""}
                      height={36}
                      width={36}
                      loading="lazy"
                    />
                    <AvatarFallback>{user?.username}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center flex-col space-y-1">
                    <h3 className="text-sm text-[#333333] font-semibold ">
                      Daniel Jensen
                    </h3>
                    <p className="text-xs text-[#BDBDBD] font-semibold">
                      on 4 July, 2020
                    </p>
                  </div>
                </div>
              </div>
              <BoardDescriptionForm boardId={boardId} />
              <div className="space-y-5">
                <div className="text-[#BDBDBD] flex items-center gap-1.5">
                  <Icons.Users2 className="h-4 w-4" />
                  <h3 className="text-xs font-semibold">Team</h3>
                </div>
                <BoardUsers />
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
