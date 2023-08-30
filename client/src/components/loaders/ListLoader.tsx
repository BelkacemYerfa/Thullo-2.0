import { Skeleton } from "@/components/ui/skeleton";
import { CardLoader } from "@/components/loaders/CardLoader";

export const ListLoader = () => {
  return (
    <div className="flex flex-col gap-3 w-80">
      <Skeleton className="h-4 w-20" />
      <div className="flex flex-col gap-3 w-full px-2">
        {[...Array(Math.floor(Math.random() * 5) < 2 ? 2 : 3)].map((_, i) => (
          <CardLoader key={i} />
        ))}
      </div>
    </div>
  );
};
