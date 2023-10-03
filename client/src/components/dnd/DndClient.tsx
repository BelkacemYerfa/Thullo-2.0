"use client";

import { TasksList } from "@/components/list/TasksList";
import { useCallback, useEffect, useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { Column, InitialData, Task } from "@/types";
import { useBoardStore } from "@/lib/store/board-store";
import { DropAreaList } from "@/components/dnd/DropArea";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { io } from "socket.io-client";
import { useSocketStore } from "@/lib/store/socket-store";
import {
  addCard,
  addComment,
  addLabel,
  editDescription,
  removeCard,
  removeComment,
  removeLabel,
} from "@/lib/DndFunc/card";
import { useGenerationStore } from "@/lib/store/popups-store";
import { addList, editListName, removeList } from "@/lib/DndFunc/list";
import { useMounted } from "@/hooks/useMounted";
import { ContextLoader } from "@/components/loaders/ContextLoader";
import { Icons } from "../Icons";

const socket = io("http://localhost:8000");

type DndContextProviderProps = {
  boardId: string;
  db: InitialData;
};

export const DndClient = ({ boardId, db }: DndContextProviderProps) => {
  const [isMounted] = useMounted();
  const { initialData, setInitialData } = useGenerationStore();
  const { draggingCard, draggingList } = useBoardStore();
  const { setSocket } = useSocketStore();
  const [colRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    setInitialData(db);
  }, []);

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
    if (!socket) return;
    //card
    socket.on("card:move", (task) => {
      onDrop(initialData.columns[task.colId], task.index, task.draggingCard);
    });
    socket.on("card:add", (card: Task) => {
      const newState = addCard(card, initialData);
      setInitialData(newState);
    });
    socket.on("card:delete", (cardId: string) => {
      const newState = removeCard(cardId, initialData);
      setInitialData(newState);
    });
    //list
    socket.on("list:move", (column) => {
      reorderColumns(column.index, column.draggingList);
    });
    socket.on("list:add", (column: Column) => {
      const newState = addList(column, initialData);
      setInitialData(newState);
    });
    socket.on("list:delete", (columnId: string) => {
      const newState = removeList(columnId, initialData);
      setInitialData(newState);
    });
    socket.on("list:edit", (list) => {
      const newState = editListName(list.name, list.id, initialData);
      setInitialData(newState);
    });
    socket.on("comment:add", (data) => {
      const newState = addComment(data.cardId, data.comment, initialData);
      setInitialData(newState);
    });
    socket.on("comment:delete", (comment) => {
      const newState = removeComment(
        comment.cardId,
        comment.commentId,
        initialData
      );
      setInitialData(newState);
    });
    socket.on("label:add", (data) => {
      const newState = addLabel(data.cardId, data.label, initialData);
      setInitialData(newState);
    });
    socket.on("label:delete", (label) => {
      const newState = removeLabel(label.cardId, label.labelId, initialData);
      setInitialData(newState);
    });
    socket.on("card:description", (data) => {
      const newState = editDescription(
        data.description,
        data.cardId,
        initialData
      );
      setInitialData(newState);
    });
    return () => {
      socket.off("card:move");
      socket.off("card:add");
      socket.off("card:delete");
      socket.off("list:move");
      socket.off("list:add");
      socket.off("list:delete");
      socket.off("list:edit");
      socket.off("comment:add");
      socket.off("comment:delete");
      socket.off("label:add");
      socket.off("label:delete");
    };
  }, [initialData, reorderColumns, onDrop, setInitialData]);

  return isMounted ? (
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
              <TasksList column={column} tasks={tasks} onDrop={onDrop} />
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
  ) : (
    <div className="flex items-center justify-center h-full">
      <Icons.Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};
