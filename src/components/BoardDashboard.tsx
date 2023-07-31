import { TasksList } from "./list/TasksList";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export const BoardDashboard = () => {
  return (
    <div className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-3xl w-full h-full overflow-hidden ">
      <ScrollArea className="h-full px-4 py-4 rounded-xl">
        <ScrollBar className="h-2 w-full" orientation="horizontal"></ScrollBar>
        <div className="flex w-full h-full items-center gap-x-8 overflow-x-auto ">
          <TasksList />
          <TasksList />
          <TasksList />
        </div>
      </ScrollArea>
    </div>
  );
};
