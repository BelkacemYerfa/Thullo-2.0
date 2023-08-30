interface Board {
  id: string;
  name: string;
  description: string;
  image: Pick<Image, "fileUrl">[];
  user: string;
  Lists: List[];
}

interface List {
  id: string;
  name: string;
  cards: Card[];
}

interface Card {
  id: string;
  name: string;
  description: string;
  user: string;
  image: string;
  comments: Comment[] | null;
  list: Pick<List, "name">;
  labels: labels[];
}

interface Comment {
  id: string;
  text: string;
  user: string;
}

interface Image {
  id: string;
  fileKey: string;
  fileUrl: string;
}

interface User {
  id: string;
  name: string;
  image: string;
  boardId: string;
  commentId: string;
}

interface comments {
  id: string;
  text: string;
  createdAt: string;
  user: Pick<User, "name" | "image" | "id">;
}

interface labels {
  id: string;
  name: string;
  color: string;
}

interface Task {
  id: string;
  content: string;
  image?: string;
  labels?: labels[];
  comments?: Pick<comments, "id">[];
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface InitialData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}
