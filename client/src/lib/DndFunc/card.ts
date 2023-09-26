import { InitialData, Task } from "@/types";

export const addCard = (card: Task, initialData: InitialData) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [card.id]: card,
    },
  };
  if (!newState.columns[card.colId].taskIds.includes(card.id)) {
    newState.columns[card.colId].taskIds.push(card.id);
  }
  return newState;
};
