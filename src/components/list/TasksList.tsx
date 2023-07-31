import { ListCardsSettingsPopOver } from "../Popups/ListCardsSettingsPopOver";
import { TodoCard } from "../card/TodoCard";
import { ListNameChangeForm } from "../forms/ListNameChangeForm";

export const TasksList = () => {
  return (
    <div className="relative h-fit w-80 space-y-5 ">
      <div className="flex items-center justify-between w-full">
        <ListNameChangeForm />
        <ListCardsSettingsPopOver />
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
