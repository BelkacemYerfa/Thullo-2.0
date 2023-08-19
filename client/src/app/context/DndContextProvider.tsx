"use client";

import { TasksList } from "@/components/list/TasksList";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { InitialData, Column } from "./initialData";
import { useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { io } from "socket.io-client";

/* const socket = io("http://localhost:5000");
 */
type DndContextProviderProps = {
  boardId: string;
  db: InitialData;
};

export const DndContextProvider = ({
  boardId,
  db,
}: DndContextProviderProps) => {
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
      /* socket.emit("start_dragging", {
        sourceIndex: source.index,
        destinationIndex: destination.index,
        draggableId: draggableId,
        roomId: boardId,
      }); */
      //this is just for testing && will be removed
      reorderColumns(source.index, destination.index, draggableId);
      /*   socket.on("update_dragging", (data) => {
        reorderColumns(
          data.sourceIndex,
          data.destinationIndex,
          data.draggableId
        );
      });
 */
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

  /* useEffect(() => {
    socket.emit("join_room", { roomId: boardId });
    socket.on("join_room", (data) => {
      console.log(data);
    });
  }, [boardId]); */
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragUpdate={() => {
        /* socket.emit("start-dragging", {
          sourceIndex: 0,
          destinationIndex: 0,
          draggableId: "0",
        });
        socket.on("start-dragging", (data) => {
          alert("data : " + data);
          reorderColumns(
            data.sourceIndex,
            data.destinationIndex,
            data.draggableId
          );
        }); */
      }}
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
    >
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provider) => (
          <div
            id="boardColumnContainer"
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
