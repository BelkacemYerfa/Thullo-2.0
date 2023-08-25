import { BoardSettingsLoader } from "@/components/loaders/BoardSettingsLoader";
import { ContextLoader } from "@/components/loaders/ContextLoader";
import { NavLoader } from "@/components/loaders/NavLoader";

export default function BoardIdLoading() {
  return (
    <main className="h-screen w-full space-y-6 flex flex-col">
      <section className="w-full space-y-5">
        <NavLoader />
        <section className="max-w-[95%] m-auto">
          <BoardSettingsLoader />
        </section>
      </section>
      <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-xl sm:rounded-t-3xl px-2 pt-2 sm:px-4 sm:pt-4 w-full h-full overflow-y-hidden pb-2 ">
        <ContextLoader />
      </section>
    </main>
  );
}
