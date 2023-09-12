import { Visibility } from "@prisma/client";

export interface Board {
  id: string;
  name: string;
  description: string;
  image: Pick<Image, "fileUrl">[];
  user: string;
  Lists: List[];
  visibility: Visibility;
}

export interface List {
  id: string;
  name: string;
  cards: Card[];
}

export interface Card {
  id: string;
  name: string;
  description: string;
  user: string;
  image: string;
  comments: Comment[] | null;
  list: Pick<List, "name">;
  labels: labels[];
}

export interface Comment {
  id: string;
  text: string;
  user: string;
}

export interface Image {
  id: string;
  fileKey: string;
  fileUrl: string;
}

export interface User {
  id: string;
  name: string;
  image: string;
  boardId: string;
  commentId: string;
}

export interface comments {
  id: string;
  text: string;
  createdAt: string;
  user: Pick<User, "name" | "image" | "id">;
}

export interface labels {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  content: string;
  image?: string;
  labels?: labels[];
  comments: number;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface InitialData {
  tasks: Record<UniqueIdentifier, Task>;
  columns: Record<UniqueIdentifier, Column>;
  columnOrder: string[];
}

export interface StoredImage {
  fileKey: string | undefined;
  fileUrl: string | undefined;
}

export type Boards = Pick<Board, "id" | "name" | "image">[];

export type UniqueIdentifier = string;
