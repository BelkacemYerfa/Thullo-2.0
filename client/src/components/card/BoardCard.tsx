import Image from "next/image";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { AspectRatio } from "../ui/aspect-ratio";

type BoardCardProps = {
  title: string;
  boardBanner: string;
  usersPics: string[];
  boardId: string;
};

export const BoardCard = ({
  title,
  boardBanner,
  usersPics,
  boardId,
}: BoardCardProps) => {
  return (
    <Card className="relative shadow-outline-black rounded-xl  ">
      <Link
        href={`/board/${boardId}`}
        className="absolute inset-0 z-10"
        aria-label="open board"
      ></Link>
      <CardHeader className="p-3 space-y-3">
        <AspectRatio ratio={3 / 2}>
          <Image
            src={boardBanner}
            alt={title + " board banner"}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-xl object-cover "
            quality={100}
          />
        </AspectRatio>
        <CardTitle className="text-base font-medium ">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-x-3 p-3">
        {usersPics.slice(0, 4).map((pic, index) =>
          index < 3 ? (
            <Avatar
              key={index}
              className="h-8 w-8 2xl:h-8 2xl:w-8 xl:h-10 xl:w-10 rounded-lg"
            >
              <AvatarImage
                src={pic}
                alt={"pic"}
                height={32}
                width={32}
                loading="lazy"
              />
              <AvatarFallback className="rounded-lg">{pic}</AvatarFallback>
            </Avatar>
          ) : (
            <p key={pic + index} className="text-[#BDBDBD] text-sm font-medium">
              +{usersPics.length - 3} others
            </p>
          )
        )}
      </CardContent>
    </Card>
  );
};
