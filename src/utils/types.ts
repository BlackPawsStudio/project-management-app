export interface BoardType {
  _id: string;
  title: string;
  owner: string;
  users: string[];
  columns?: ColumnType[];
}

export interface IssueType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
}

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface UserType {
  _id: string;
  name: string;
  login: string;
}
