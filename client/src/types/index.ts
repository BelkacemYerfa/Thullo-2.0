type board = {
  id: string;
  name: string;
  description: string;
  image: Pick<images, "fileUrl">[];
  user: string;
  Lists: list[];
};

type list = {
  id: string;
  name: string;
  cards: card[];
};

type card = {
  id: string;
  name: string;
  description: string;
  user: string;
  image: string;
  comments: comment[] | null;
  list: Pick<list, "name">;
  labels: labels[];
};

type comment = {
  id: string;
  text: string;
  user: string;
};

type images = {
  id: string;
  fileKey: string;
  fileUrl: string;
};

type User = {
  id: string;
  name: string;
  image: string;
  boardId: string;
  commentId: string;
};

type comments = {
  id: string;
  text: string;
  createdAt: string;
  user: Pick<User, "name" | "image" | "id">;
};

type labels = {
  id: string;
  name: string;
  color: string;
};
