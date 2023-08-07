import { AddNewListPopOver } from "./Popups/AddNewListPopOver";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { DndContextProvider } from "@/app/context/DndContextProvider";

export const BoardDashboard = () => {
  return (
    <div
      id="boardDashboard"
      className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-3xl w-full h-full overflow-hidden p-4 rounded-xl "
    >
      <div className="h-full flex w-full gap-x-8">
        <DndContextProvider />
        <AddNewListPopOver />
      </div>
    </div>
  );
};
