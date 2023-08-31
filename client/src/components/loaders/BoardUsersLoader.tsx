import { Skeleton } from "../ui/skeleton";

export const BoardUsersLoader = () => {
  return (
    <div className="space-y-4 w-full">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-full flex items-center justify-between ">
          <div className="flex items-center gap-4 w-full">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  );
};
