import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/Icons";
import { useUser } from "@clerk/nextjs";
import { CardDetailedPopOver } from "@/components/Popups/CardDetailedPopOver";
import { AddUserToCard } from "@/components/Popups/AddUserCardActions";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Task } from "@/types";
import { useBoardStore } from "@/lib/store/board-store";

type TodoCardProps = {
  task: Task;
};

export const TodoCard = ({ task }: TodoCardProps) => {
  const { user } = useUser();
  const { comments, id: cardId, content, labels } = task;
  const { setDraggingCard } = useBoardStore();

  return (
    <Card
      draggable="true"
      onDragStart={(ev) => {
        setDraggingCard(cardId);
        ev.dataTransfer.setData("text/html", ev.currentTarget.outerHTML);
      }}
      onDragEnd={() => setDraggingCard(null)}
      className="cursor-grab active:cursor-grabbing active:animate-pulse"
    >
      <CardHeader className="space-y-3 px-3 py-2">
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
          <CardDetailedPopOver cardId={cardId} taskTitle={content} />
          <div className="w-0 h-[1px] bg-[#828282] group-hover:w-full duration-200 ease-linear" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 py-2 space-y-3">
        {labels.length !== 0 && (
          <div className="flex items-center gap-x-2">
            {labels.map((label) => (
              <Badge
                key={label.id}
                className={`text-xs font-semibold px-2 py-1 rounded-xl text-white`}
                style={{ backgroundColor: label.color }}
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}
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
            <div className="flex items-center gap-x-1 text-[#BDBDBD]">
              <Icons.MessageCircle className="h-5 w-5 " />
              <span>{comments}</span>
            </div>
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
