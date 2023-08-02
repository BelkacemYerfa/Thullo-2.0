export interface Task {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface InitialData {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

const db: InitialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2"],
    },
    "column-2": {
      id: "column-2",
      title: "Other Todo ",
      taskIds: ["task-3", "task-4"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
};

export default db;
