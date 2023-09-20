"use client";

import { TasksList } from "@/components/list/TasksList";

import { useEffect, useState } from "react";
import { AddNewListPopOver } from "@/components/Popups/AddNewListPopOver";
import { Column, InitialData } from "@/types";
import { useBoardStore } from "@/lib/store/board-store";
import { DropAreaList } from "@/components/dnd/DropArea";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type DndContextProviderProps = {
  boardId: string;
  db: InitialData;
};

export const DndContextProvider = ({
  boardId,
  db,
}: DndContextProviderProps) => {
  const [initialData, setInitialData] = useState<InitialData>(db);
  const { draggingCard, draggingList } = useBoardStore();
  const [colRef] = useAutoAnimate<HTMLDivElement>();
  useEffect(() => {
    setInitialData(db);
  }, [db]);

  const reorderColumns = (index: number) => {
    if (!draggingList) return;
    const sourceIndex = initialData.columnOrder.indexOf(draggingList);
    const destinationIndex = index;
    console.log(sourceIndex, destinationIndex);
    if (
      sourceIndex === destinationIndex ||
      sourceIndex === destinationIndex - 1
    ) {
      console.log(sourceIndex, destinationIndex, "returning");
      return;
    }
    initialData.columnOrder.splice(sourceIndex, 1);
    initialData.columnOrder.splice(destinationIndex, 0, draggingList);
    const newState: InitialData = {
      ...initialData,
      columnOrder: [...initialData.columnOrder],
    };
    setInitialData(newState);
  };

  const onDrop = (column: Column, index: number) => {
    if (!draggingCard) return;
    const task = initialData.tasks[draggingCard];
    const sourceCol = task.colId;
    const sourceIndex = initialData.columns[sourceCol].taskIds.indexOf(task.id);
    const destinationCol = column.id;
    if (
      sourceCol === destinationCol &&
      (sourceIndex === index || sourceIndex === index - 1)
    ) {
      return;
    }
    const newState: InitialData = {
      ...initialData,
      columns: {
        ...initialData.columns,
      },
    };
    const sourceColumn = newState.columns[sourceCol];
    const destinationColumn = newState.columns[destinationCol];
    sourceColumn.taskIds.splice(sourceIndex, 1);
    destinationColumn.taskIds.splice(index, 0, task.id);
    task.colId = destinationCol;
    /*Update the db */
    setInitialData(newState);
  };
  return (
    <div
      className="h-full flex snap-x snap-mandatory md:snap-none  relative overflow-x-auto "
      ref={colRef}
    >
      <DropAreaList onDrop={() => reorderColumns(0)} />
      {initialData.columnOrder.map((columnId, index) => {
        const column = initialData.columns[columnId];
        const tasks = column.taskIds.map(
          (taskId: string) => initialData.tasks[taskId]
        );
        return (
          <div key={columnId} className="relative ">
            <div className="relative h-full snap-center pb-2 flex ">
              <TasksList column={column} tasks={tasks} onDrop={onDrop} />
              <DropAreaList onDrop={() => reorderColumns(index + 1)} />
            </div>
          </div>
        );
      })}
      <AddNewListPopOver boardId={boardId} />
    </div>
  );
};
