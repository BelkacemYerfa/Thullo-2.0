import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { BoardUserInvitePopOver } from "../Popups/BoardUserInvitePopOver";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../Icons";
import { auth } from "@clerk/nextjs";

export const TodoCard = () => {
  const { user } = auth();
  const img = "";
  return (
    <Card className="relative shadow-outline-black rounded-xl w-full ">
      <CardHeader className="space-y-3 p-3">
        {img && (
          <Image
            src={img}
            alt="img"
            height={130}
            width={220}
            className="w-full h-[200px] rounded-xl"
            quality={100}
          />
        )}
        <CardTitle className="text-base font-normal p-0">
          Github jobs challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-5 ">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <Badge
            className={cn(
              "bg-[#D5E6FB] hover:bg-[#2F80ED] py-1 px-2 text-xs font-medium text-[#2F80ED] hover:text-[#D5E6FB] cursor-default"
            )}
          >
            Technical
          </Badge>
          <Badge
            className={cn(
              "bg-[#D5E6FB] hover:bg-[#219653]  py-1 px-2 text-xs font-medium text-[#219653] hover:text-[#D5E6FB] cursor-default"
            )}
          >
            Design
          </Badge>
        </div>
        <CardFooter className="flex items-center justify-between w-full p-0">
          <div className="flex items-center gap-x-2">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={user?.imageUrl}
                alt={user?.username ?? ""}
                height={40}
                width={40}
                loading="lazy"
              />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
            <BoardUserInvitePopOver />
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1 text-[#BDBDBD]">
              <Icons.MessageCircle className="h-5 w-5  " />
              <span>2</span>
            </div>
            <div className="flex items-center gap-x-1 text-[#BDBDBD]">
              <Icons.Paperclip className="h-5 w-5 " />
              <span>2</span>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
