import { Icons } from "../Icons";
import { TodoCard } from "../card/TodoCard";

export const TasksList = () => {
  return (
    <div className="h-fit w-80 space-y-5 ">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-sm text-[#333333] font-medium ">BackLog</h3>
        <Icons.MoreHorizontal className="h-4 w-4" />
      </div>
      <div className="space-y-6 ">
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </div>
  );
};
