import {
  Draggable,
  Droppable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { TodoCard } from "../card/TodoCard";
import { CardListForm } from "@/components/forms/CardListForm";
import { ListNameChangeForm } from "@/components/forms/ListNameChangeForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Column, Task } from "@/types";

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
  const { id, title } = column;
  return (
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={` w-[340px] px-2 h-full rounded-xl `}
        >
          <div className="relative h-full flex flex-col gap-y-3">
            <div
              className="sticky top-0 z-[4] flex items-center justify-between w-full py-2 px-1 gap-2 "
              {...dragHandleProps}
            >
              <ListNameChangeForm title={title} listId={id} />
            </div>
            <ScrollArea className="h-full w-full flex-1 px-3 ">
              <div className="h-full ">
                {tasks.map((task, i) => (
                  <Draggable key={task.id} draggableId={task.id} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={`pb-3`}
                      >
                        <TodoCard task={task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <CardListForm listId={id} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </Droppable>
  );
};
