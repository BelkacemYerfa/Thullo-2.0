import { InitialData, Task, comments, labels } from "@/types";

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

export const removeCard = (cardId: string, initialData: InitialData) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
    },
  };
  if (newState.tasks[cardId]?.colId) {
    newState.columns[newState.tasks[cardId].colId].taskIds = newState.columns[
      newState.tasks[cardId].colId
    ].taskIds.filter((taskId) => taskId !== cardId);
    delete newState.tasks[cardId];
  }
  return newState;
};

//comments

export const addComment = (
  cardId: string,
  comment: comments,
  initialData: InitialData
) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [cardId]: {
        ...initialData.tasks[cardId],
        comments: [...initialData.tasks[cardId].comments, comment],
      },
    },
  };
  return newState;
};

export const removeComment = (
  cardId: string,
  commentId: string,
  initialData: InitialData
) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [cardId]: {
        ...initialData.tasks[cardId],
        comments: initialData.tasks[cardId].comments.filter(
          (comment) => comment.id !== commentId
        ),
      },
    },
  };
  return newState;
};

//labels

export const addLabel = (
  cardId: string,
  label: labels,
  initialData: InitialData
) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [cardId]: {
        ...initialData.tasks[cardId],
        labels: [...initialData.tasks[cardId].labels, label],
      },
    },
  };
  return newState;
};

export const removeLabel = (
  cardId: string,
  labelId: string,
  initialData: InitialData
) => {
  const newState: InitialData = {
    ...initialData,
    tasks: {
      ...initialData.tasks,
      [cardId]: {
        ...initialData.tasks[cardId],
        labels: initialData.tasks[cardId].labels.filter(
          (label) => label.id !== labelId
        ),
      },
    },
  };
  return newState;
};
