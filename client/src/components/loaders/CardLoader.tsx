import { Skeleton } from "@/components/ui/skeleton";

export const CardLoader = () => {
  return (
    <div className="p-3 flex flex-col gap-2 bg-white rounded-xl ">
      <Skeleton className="w-40 h-5" />
      <div className="flex items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className=" h-4 w-16 " />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {[...Array(2)].map((_, index) => (
          <Skeleton key={index} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
    </div>
  );
};
