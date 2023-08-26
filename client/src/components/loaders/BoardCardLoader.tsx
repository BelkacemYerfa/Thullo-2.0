import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export const BoardCardLoader = () => {
  return (
    <div className="flex w-full shadow-outline-black flex-col rounded-xl gap-3 p-3 bg-white  ">
      <AspectRatio ratio={3 / 2}>
        <Skeleton className="rounded-xl absolute inset-0 " />
      </AspectRatio>
      <div className="w-80">
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex items-center gap-3">
        {[...Array(2)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-8 w-8 2xl:h-8 2xl:w-8 xl:h-10 xl:w-10 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};
