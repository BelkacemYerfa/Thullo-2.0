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
