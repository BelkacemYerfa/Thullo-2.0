import { InitialData, Column } from "@/types";

export const addList = (list: Column, initialData: InitialData) => {
  const newState: InitialData = {
    ...initialData,
    columnOrder: [...initialData.columnOrder, list.id],
    columns: {
      ...initialData.columns,
      [list.id]: list,
    },
  };
  console.log(newState);
  return newState;
};

export const editListName = (
  title: string,
  listId: string,
  initialData: InitialData
) => {
  const newState: InitialData = {
    ...initialData,
    columns: {
      ...initialData.columns,
      [listId]: {
        ...initialData.columns[listId],
        title: title,
      },
    },
  };
  return newState;
};

export const removeList = (listId: string, initialData: InitialData) => {
  const newState: InitialData = {
    ...initialData,
    columns: {
      ...initialData.columns,
    },
  };
  newState.columns[listId]?.taskIds.forEach((taskId) => {
    delete newState.tasks[taskId];
  });
  delete newState.columns[listId];
  newState.columnOrder = newState.columnOrder.filter((id) => id !== listId);
  return newState;
};
