interface IBoard {
  id: string;
  name: string;
  description: string;
  image: Image[];
  user: User[];
  Lists: IList[];
}

interface Image {
  id: string;
  fileKey: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IList {
  id: string;
  name: string;
  description: string;
  Board: IBoard;
  Cards: ICard[];
}

interface ICard {
  id: string;
  image: StoredImage;
  title: string;
  description: string;
  List: IList;
  Labels: ILabel[];
  members: IMember[];
}

interface ILabel {
  id: string;
  title: string;
  color: string;
}

interface IMember {
  id: string;
  name: string;
  image: StoredImage;
}
