export interface BoardType {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IssueType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
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