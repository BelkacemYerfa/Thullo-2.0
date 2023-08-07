import { Draggable, Droppable } from "react-beautiful-dnd";
import { ListCardsSettingsPopOver } from "../Popups/ListCardsSettingsPopOver";
import { TodoCard } from "../card/TodoCard";
import { CardListForm } from "../forms/CardListForm";
import { ListNameChangeForm } from "../forms/ListNameChangeForm";
import { Column, Task } from "@/app/context/initialData";
import { ScrollArea } from "../ui/scroll-area";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

type TasksListProps = {
  column: Column;
  tasks: Task[];
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};

export const TasksList = ({
  column,
  tasks,
  dragHandleProps,
}: TasksListProps) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="relative w-80 h-full rounded-xl"
        >
          <div className="relative h-full bg-[#F4F9FF] flex flex-col gap-y-3">
            <div
              className="sticky top-0 z-[4] flex items-center justify-between w-full bg-[#F8F9FD] py-2"
              {...dragHandleProps}
            >
              <ListNameChangeForm />
              <ListCardsSettingsPopOver />
            </div>
            <ScrollArea className="h-full w-full flex-1">
              <div className="h-full px-2 space-y-4">
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
              </div>
            </ScrollArea>
            <CardListForm />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
