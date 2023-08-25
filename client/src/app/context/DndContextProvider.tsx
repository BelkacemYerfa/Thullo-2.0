"use client";

import { TasksList } from "@/components/list/TasksList";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { InitialData, Column } from "./initialData";
import { useEffect, useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import client from "@/lib/prismaDb";
import { Lists } from "../(lobby)/board/[boardId]/page";
import { getBoardInfo } from "../_actions/board";
import { Icons } from "@/components/Icons";

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
  resetServerContext();

  /* const [initialData, setInitialData] = useState<InitialData>(
    {} as InitialData
  );

  const [cachedColumnOrder, setCachedColumnOrder] = useState<string[]>([]);

  useEffect(() => {
    setCachedColumnOrder(initialData?.columnOrder);
  }, [initialData]);

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
 */

  /* useEffect(() => {
    socket.emit("join_room", { roomId: boardId });
    socket.on("join_room", (data) => {
      console.log(data);
    });
  }, [boardId]); */
  return (
    <DragDropContext
      onDragEnd={() => {}}
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
      //onBeforeCapture={onBeforeCapture}
      //onBeforeDragStart={onBeforeDragStart}
    >
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provider) => (
          <div
            id="boardColumnContainer"
            className="h-full flex snap-x snap-mandatory md:snap-none  relative overflow-x-auto "
            {...provider.droppableProps}
            ref={provider.innerRef}
          >
            {db?.columnOrder.map((columnId, index) => {
              const column = db?.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId: string) => db?.tasks[taskId]
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
