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
import { AspectRatio } from "../ui/aspect-ratio";
type TodoCardProps = {
  task: Task;
  cardId: string;
};

export const TodoCard = ({ task, cardId }: TodoCardProps) => {
  const { user } = useUser();
  const { labels, comments } = task;
  return (
    <Card>
      <CardHeader className="space-y-3 p-3">
        {task.image ? (
          <AspectRatio ratio={3 / 2}>
            <Image
              src={task.image}
              alt={`${task.content} image`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover rounded-xl"
              quality={100}
            />
          </AspectRatio>
        ) : null}
        <CardTitle className="text-base font-normal p-0 group w-fit flex flex-col -space-y-[2.5px] items-center">
          <CardDetailedPopOver cardId={cardId} taskTitle={task.content} />
          <div className="w-0 h-[1px] bg-[#828282] group-hover:w-full duration-200 ease-linear" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 space-y-3">
        {labels?.length !== 0 ? (
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
            {labels?.map((badge) => (
              <Badge
                key={badge.id}
                className={cn(
                  `hover:bg-[#D5E6FB] py-1 px-2 text-xs font-medium  cursor-default text-white rounded-xl `
                )}
                style={{ backgroundColor: badge.color }}
              >
                {badge.name}
              </Badge>
            ))}
          </div>
        ) : null}

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
              <AvatarFallback className="rounded-lg">
                {user?.username}
              </AvatarFallback>
            </Avatar>
            <AddUserToCard />
          </div>
          <div className="flex items-center gap-x-2">
            {typeof comments?.length === "number" ? (
              <div className="flex items-center gap-x-1 text-[#BDBDBD]">
                <Icons.MessageCircle className="h-5 w-5  " />
                <span>{comments?.length}</span>
              </div>
            ) : null}
            {/* <div className="flex items-center gap-x-1 text-[#BDBDBD]">
              <Icons.Paperclip className="h-5 w-5 " />
              <span>2</span>
            </div> */}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
