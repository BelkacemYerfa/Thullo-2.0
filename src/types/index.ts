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
  list: Pick<List, "name">;
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
  createdAt: Date;
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
  comments: number;
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

export interface StoredImage {
  fileKey: string | undefined;
  fileUrl: string | undefined;
}

export type Boards = Pick<Board, "id" | "name" | "image">[];

export type UniqueIdentifier = string;
