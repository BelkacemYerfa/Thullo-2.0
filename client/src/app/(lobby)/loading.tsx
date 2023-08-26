import { BoardCardLoader } from "@/components/loaders/BoardCardLoader";
import { NavLoader } from "@/components/loaders/NavLoader";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main className="h-screen w-full flex flex-col">
      <NavLoader />
      <section className="flex-1 max-w-[90%] sm:max-w-[80%] mx-auto pt-10 space-y-7 ">
        <div className="w-full flex items-center justify-between ">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <ul className="flex w-full flex-col items-center justify-center overflow-y-auto p-6 md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 pb-5 overflow-hidden ">
          {[...Array(5)].map((_, i) => (
            <BoardCardLoader key={i} />
          ))}
        </ul>
      </section>
    </main>
  );
}
