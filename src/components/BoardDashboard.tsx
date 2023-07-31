import { TasksList } from "./list/TasksList";
import { ScrollArea } from "./ui/scroll-area";

export const BoardDashboard = () => {
  return (
    <div className="flex-1 max-w-[95%] m-auto bg-[#F8F9FD] rounded-t-3xl w-full p-6 h-full overflow-auto ">
      <ScrollArea className="h-full  ">
        <div className="flex w-full h-full items-center gap-x-8 overflow-auto ">
          <TasksList />
          <TasksList />
          <TasksList />
          <TasksList />
        </div>
      </ScrollArea>
    </div>
  );
};
