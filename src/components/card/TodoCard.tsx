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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../Icons";
import { useUser } from "@clerk/nextjs";
import { Task } from "@/app/context/initialData";
import { CardDetailedPopOver } from "../Popups/CardDetailedPopOver";
import { AddUserToCard } from "../Popups/AddUserCardActions";

type TodoCardProps = {
  task: Task;
  cardId: string;
};

type cardBadge = {
  title: string;
  color: string;
};

const cardBadges = [
  {
    title: "Technical",
    color: "#2F80ED",
  },
  {
    title: "Design",
    color: "#219653",
  },
] satisfies cardBadge[];

export const TodoCard = ({ task, cardId }: TodoCardProps) => {
  const { user } = useUser();
  const img = "";
  return (
    <Card>
      <CardHeader className="space-y-3 p-3">
        {img ? (
          <Image
            src={img}
            alt="img"
            height={130}
            width={220}
            loading="lazy"
            className="w-full h-[200px] rounded-xl"
            quality={100}
          />
        ) : null}
        <CardTitle className="text-base font-normal p-0 group w-fit flex flex-col -space-y-[2.5px] items-center">
          <CardDetailedPopOver cardId={cardId} taskTitle={task.content} />
          <div className="w-0 h-[1px] bg-[#828282] group-hover:w-full duration-200 ease-linear" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 space-y-3">
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          {cardBadges.slice(0, 5).map((badge) => (
            <Badge
              key={badge.color}
              className={cn(
                `bg-[#D5E6FB] hover:bg-[#D5E6FB] py-1 px-2 text-xs font-medium  cursor-default `
              )}
              style={{ color: badge.color }}
            >
              {badge.title}
            </Badge>
          ))}
        </div>
        <CardFooter className="flex items-center justify-between w-full p-0">
          <div className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={"https://i.pravatar.cc/150?img=68"}
                alt={user?.username ?? ""}
                height={32}
                width={32}
                loading="lazy"
              />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
            <AddUserToCard />
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
