"use client";

import { TasksList } from "@/components/list/TasksList";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import db, { InitialData, Column } from "./initialData";
import { useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";

export const DndContextProvider = () => {
  const [initialData, setInitialData] = useState<InitialData>(db);

  const [cachedColumnOrder, setCachedColumnOrder] = useState<string[]>(
    initialData.columnOrder
  );

  const onBeforeCapture = () => {
    setCachedColumnOrder(initialData.columnOrder);
  };

  const onBeforeDragStart = () => {
    setCachedColumnOrder(initialData.columnOrder);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      // Dragged outside of a valid drop target
      setInitialData((prevState) => ({
        ...prevState,
        columnOrder: cachedColumnOrder, // Reset the column order
      }));
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // Position not changed, no need to update the state
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(initialData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setInitialData((prevState) => ({
        ...prevState,
        columnOrder: newColumnOrder,
      }));

      return;
    }

    setInitialData((prevState) => {
      const newState: InitialData = {
        ...prevState,
        columns: {
          ...prevState.columns,
        },
      };

      const sourceColumn: Column = newState.columns[source.droppableId];
      const newSourceTaskIds = Array.from(sourceColumn.taskIds);
      newSourceTaskIds.splice(source.index, 1);
      newState.columns[source.droppableId] = {
        ...sourceColumn,
        taskIds: newSourceTaskIds,
      };

      const destinationColumn: Column =
        newState.columns[destination.droppableId];
      const newDestinationTaskIds = Array.from(destinationColumn.taskIds);
      newDestinationTaskIds.splice(destination.index, 0, draggableId);
      newState.columns[destination.droppableId] = {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      };

      return newState;
    });
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provider) => (
          <div
            id="boardColumnContainer"
            className="h-full flex snap-x snap-mandatory md:snap-none  relative overflow-x-auto overflow-y-hidden "
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
                      console.log("dragging");
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
            <AddNewListPopOver />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
