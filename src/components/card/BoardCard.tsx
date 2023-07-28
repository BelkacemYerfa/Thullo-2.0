import Image from "next/image";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";
import Link from "next/link";

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
    <Card className="relative border-none shadow-outline-black rounded-xl">
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
          className="w-full h-[200px] rounded-xl"
          quality={100}
        />
        <CardTitle className="text-base font-medium ">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-x-3 p-3">
        {usersPics.map((pic, index) =>
          index < 3 ? (
            <Image
              key={pic + index}
              src={pic}
              alt={"user profile pic"}
              height={32}
              width={32}
              className="rounded-lg"
              quality={100}
            />
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
