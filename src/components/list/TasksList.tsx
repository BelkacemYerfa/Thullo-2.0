import { Draggable, Droppable } from "react-beautiful-dnd";
import { ListCardsSettingsPopOver } from "../Popups/ListCardsSettingsPopOver";
import { TodoCard } from "../card/TodoCard";
import { CardListForm } from "../forms/CardListForm";
import { ListNameChangeForm } from "../forms/ListNameChangeForm";
import { Column, Task } from "@/app/context/initialData";

type TasksListProps = {
  column: Column;
  tasks: Task[];
};

export const TasksList = ({ column, tasks }: TasksListProps) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="relative h-fit w-80 space-y-4 "
        >
          <div className="flex items-center justify-between w-full">
            <ListNameChangeForm />
            <ListCardsSettingsPopOver />
          </div>
          <>
            <div className="space-y-6">
              {tasks.map((task, i) => (
                <Draggable key={task.id} draggableId={task.id} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <TodoCard cardId={task.id} task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              <CardListForm />
            </div>
          </>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
