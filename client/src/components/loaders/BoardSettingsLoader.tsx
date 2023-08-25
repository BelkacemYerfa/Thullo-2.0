import { Skeleton } from "../ui/skeleton";

export const BoardSettingsLoader = () => {
  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex items-center gap-x-5">
        <Skeleton className="w-20 h-10" />
        <div className="flex items-center gap-x-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-10 rounded-lg" />
          ))}
        </div>
      </div>
      <Skeleton className="h-10 w-32" />
    </section>
  );
};
