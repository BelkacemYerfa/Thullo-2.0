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
      <Link href={`/board/${boardId}`} className="absolute inset-0"></Link>
      <CardHeader className="p-3 space-y-3 ">
        <Image
          src={boardBanner}
          alt={title + " board banner"}
          loading="lazy"
          placeholder="blur"
          blurDataURL={boardBanner}
          height={130}
          width={220}
          className="w-full h-52  sm:h-[150px] xl:h-[140px] rounded-xl"
          quality={100}
        />
        <CardTitle className="text-base font-medium ">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-x-3 p-3">
        {usersPics.map((pic, index) =>
          index < 3 ? (
            <Avatar key={index} className="h-10 w-10 rounded-lg">
              <AvatarImage
                src={pic}
                alt={"pic"}
                height={40}
                width={40}
                loading="lazy"
              />
              <AvatarFallback>{pic}</AvatarFallback>
            </Avatar>
          ) : (
            <p key={pic + index} className="text-[#BDBDBD] text-sm font-medium">
              +{usersPics.length - index} others
            </p>
          )
        )}
      </CardContent>
    </Card>
  );
};
