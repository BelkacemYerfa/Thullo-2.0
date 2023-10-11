import { TodoCard } from "@/components/card/TodoCard";
import { CardListForm } from "@/components/forms/CardListForm";
import { ListNameChangeForm } from "@/components/forms/ListNameChangeForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Column, Task } from "@/types";
import { Placeholder } from "@/components/dnd/DropArea";
import { useBoardStore } from "@/lib/store/board-store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSocketStore } from "@/lib/store/socket-store";

type TasksListProps = {
  column: Column;
  tasks: Task[];
  onDrop: (column: Column, index: number) => void;
};

export const TasksList = ({ column, tasks, onDrop }: TasksListProps) => {
  const { id, title } = column;
  const { setDraggingList } = useBoardStore();
  const [parent] = useAutoAnimate();
  return (
    <div
      draggable="true"
      className={`w-[21.25rem] px-2 h-full rounded-xl  cursor-grab active:cursor-grabbing `}
      id={`list-${id}`}
      onDragStart={(ev) => {
        setDraggingList(id);
        ev.dataTransfer.setData("text/html", ev.currentTarget.outerHTML);
      }}
      onDragEnd={() => setDraggingList(null)}
    >
      <div className="relative h-full flex flex-col gap-y-3">
        <div className="sticky top-0 z-[4] flex items-center justify-between w-full py-2 px-1 gap-2 ">
          <ListNameChangeForm title={title} listId={id} />
        </div>
        <ScrollArea className="h-full w-full flex-1 px-3">
          <div className="h-full " ref={parent}>
            <Placeholder
              type="card"
              onDrop={() => onDrop(column, 0)}
              index={0}
              task={tasks[0]}
            />
            {tasks.map((task, i) => (
              <div key={task.id} className="relative">
                <TodoCard task={task} listName={title} />
                <Placeholder
                  type="card"
                  onDrop={() => onDrop(column, i + 1)}
                  index={i + 1}
                  task={task}
                />
              </div>
            ))}
            <CardListForm listId={id} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
