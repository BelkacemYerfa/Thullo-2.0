import Image from "next/image";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

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
    <Card className="relative shadow-outline-black rounded-xl">
      <Link
        href={`/board/${boardId}`}
        className="absolute inset-0"
        aria-label="open board"
      ></Link>
      <CardHeader className="p-3 space-y-3 sm:w-[300px] md:w-[320px]">
        <Image
          src={boardBanner}
          alt={title + " board banner"}
          loading="lazy"
          height={130}
          width={220}
          className="w-full h-52  sm:h-[180px] xl:h-[200px] 2xl:h-[140px] rounded-xl"
          quality={100}
        />
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
