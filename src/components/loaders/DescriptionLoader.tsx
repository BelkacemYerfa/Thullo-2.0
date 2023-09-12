import { Skeleton } from "../ui/skeleton";

export const DescriptionLoader = () => {
  return (
    <div className="w-full space-y-2">
      <Skeleton className="w-20 h-4" />
      <div className="w-full space-y-1">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-40 h-4" />
      </div>
    </div>
  );
};
