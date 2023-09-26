"use client";

import { TasksList } from "@/components/list/TasksList";
import { use, useCallback, useEffect, useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { Column, InitialData, Task } from "@/types";
import { useBoardStore } from "@/lib/store/board-store";
import { DropAreaList } from "@/components/dnd/DropArea";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { io } from "socket.io-client";
import { useSocketStore } from "@/lib/store/socket-store";
import { addCard } from "@/lib/DndFunc/card";
import { useGenerationStore } from "@/lib/store/popups-store";

const socket = io("http://localhost:8000");

type DndContextProviderProps = {
  boardId: string;
  db: InitialData;
};

export const DndClient = ({ boardId, db }: DndContextProviderProps) => {
  const { initialData, setInitialData } = useGenerationStore();
  const { draggingCard, draggingList } = useBoardStore();
  const { setSocket } = useSocketStore();
  const [colRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    setInitialData(db);
  }, [db, setInitialData]);

  const reorderColumns = useCallback(
    (index: number, dragList?: string) => {
      const wishedDragList = dragList ?? (draggingList as string);
      if (!wishedDragList) return;
      const sourceIndex = initialData.columnOrder.indexOf(wishedDragList);
      let destinationIndex = index;

      if (sourceIndex === destinationIndex - 1) return;
      if (sourceIndex < index) {
        destinationIndex = index - 1;
      }
      initialData.columnOrder.splice(sourceIndex, 1);
      initialData.columnOrder.splice(destinationIndex, 0, wishedDragList);
      const newState: InitialData = {
        ...initialData,
        columnOrder: [...initialData.columnOrder],
      };
      setInitialData(newState);
    },
    [initialData, draggingList, setInitialData]
  );

  const onDrop = useCallback(
    (column: Column, index: number, dragCard?: string) => {
      const wishedDragCard = dragCard ?? (draggingCard as string);
      if (!wishedDragCard) return;
      const task = initialData.tasks[wishedDragCard];
      const sourceCol = task.colId;
      const sourceIndex = initialData.columns[sourceCol].taskIds.indexOf(
        task.id
      );
      const destinationCol = column.id;
      if (
        sourceCol === destinationCol &&
        (sourceIndex === index || sourceIndex === index - 1)
      )
        return;
      const newState: InitialData = {
        ...initialData,
        columns: {
          ...initialData.columns,
        },
      };
      const sourceColumn = newState.columns[sourceCol];
      const destinationColumn = newState.columns[destinationCol];
      sourceColumn.taskIds.splice(sourceIndex, 1);
      let destinationIndex = index;
      if (sourceCol === destinationCol && sourceIndex < index) {
        destinationIndex = index - 1;
      }
      destinationColumn.taskIds.splice(destinationIndex, 0, task.id);
      task.colId = destinationCol;
      /*Update the db */
      setInitialData(newState);
    },
    [initialData, draggingCard, setInitialData]
  );

  useEffect(() => {
    setSocket(socket);
  }, [setSocket]);

  useEffect(() => {
    socket.on("card:move", (task) => {
      onDrop(initialData.columns[task.colId], task.index, task.draggingCard);
    });
    socket.on("list:move", (column) => {
      reorderColumns(column.index, column.draggingList);
    });
    socket.on("card:add", (card: Task) => {
      const newState = addCard(card, initialData);
      setInitialData(newState);
    });
    return () => {
      socket.off("card:move");
      socket.off("list:move");
      socket.off("card:add");
    };
  }, [initialData, reorderColumns, onDrop, setInitialData]);

  return (
    <div
      className="h-full flex snap-x snap-mandatory md:snap-none  relative overflow-x-auto "
      ref={colRef}
    >
      <DropAreaList onDrop={() => reorderColumns(0)} index={0} />
      {initialData.columnOrder.map((columnId, index) => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map(
          (taskId: string) => initialData.tasks[taskId]
        );
        return (
          <div key={columnId} className="relative ">
            <div className="relative h-full snap-center pb-2 flex ">
              <TasksList
                column={column}
                tasks={tasks}
                onDrop={onDrop}
                addCard={addCard}
              />
              <DropAreaList
                onDrop={() => reorderColumns(index + 1)}
                index={index + 1}
              />
            </div>
          </div>
        );
      })}
      <AddNewListPopOver boardId={boardId} />
    </div>
  );
};
