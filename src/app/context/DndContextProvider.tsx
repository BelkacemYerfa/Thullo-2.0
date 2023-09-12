"use client";

import { TasksList } from "@/components/list/TasksList";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { Column, InitialData } from "@/types";

type DndContextProviderProps = {
  boardId: string;
  db: InitialData;
};

export const DndContextProvider = ({
  boardId,
  db,
}: DndContextProviderProps) => {
  resetServerContext();

  const [initialData, setInitialData] = useState<InitialData>(db);

  useEffect(() => {
    setInitialData(db);
  }, [db]);

  const reorderColumns = (
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const newColumnOrder = Array.from(initialData.columnOrder);
    newColumnOrder.splice(sourceIndex, 1);
    newColumnOrder.splice(destinationIndex, 0, draggableId);
    setInitialData((prevState) => ({
      ...prevState,
      columnOrder: newColumnOrder,
    }));
    return;
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      //this is just for testing && will be removed
      reorderColumns(source.index, destination.index, draggableId);

      return;
    }

    const newState: InitialData = {
      ...initialData,
      columns: {
        ...initialData.columns,
      },
    };
    const sourceColumn: Column = newState.columns[source.droppableId];
    const newSourceTaskIds = Array.from(sourceColumn.taskIds);
    newSourceTaskIds.splice(source.index, 1);
    newState.columns[source.droppableId] = {
      ...sourceColumn,
      taskIds: newSourceTaskIds,
    };

    const destinationColumn: Column = newState.columns[destination.droppableId];
    const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
    newDestinationTaskIds.splice(destination.index, 0, draggableId);
    newState.columns[destination.droppableId] = {
      ...destinationColumn,
      taskIds: newDestinationTaskIds,
    };

    setInitialData(newState);
  };
  /* useEffect(() => {
    socket.emit("join_room", { roomId: boardId });
    socket.on("join_room", (data) => {
      console.log(data);
    });
  }, [boardId]); */
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={() => {}}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provider) => (
          <div
            className="h-full flex snap-x snap-mandatory md:snap-none  relative overflow-x-auto "
            {...provider.droppableProps}
            ref={provider.innerRef}
          >
            {initialData.columnOrder.map((columnId, index) => {
              const column = initialData.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId: string) => initialData.tasks[taskId]
              );
              return (
                <Draggable key={columnId} draggableId={columnId} index={index}>
                  {(provided, snapshot) => {
                    if (snapshot.isDragging) {
                    }
                    return (
                      <div className="relative listContainer ">
                        <div
                          className=" h-full snap-center pb-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <TasksList
                            column={column}
                            dragHandleProps={provided.dragHandleProps}
                            tasks={tasks}
                          />
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provider.placeholder}
            <AddNewListPopOver boardId={boardId} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
