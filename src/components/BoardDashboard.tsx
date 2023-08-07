import { AddNewListPopOver } from "./Popups/AddNewListPopOver";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { DndContextProvider } from "@/app/context/DndContextProvider";

export const BoardDashboard = () => {
  return (
    <section className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-3xl w-full h-full overflow-y-hidden  rounded-xl p-4">
      <DndContextProvider />
    </section>
  );
};
