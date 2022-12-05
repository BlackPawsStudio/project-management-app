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

export interface LogInType {
  name?: string;
  login: string;
  password: string;
}

export interface CreateColumnType {
  title: string;
  order: number;
}

export interface CreateIssueType {
  title: string,
  order: number,
  description: string,
  userId: number,
  users: string[]
}

export interface Issue {
  order: number
  boardId?: string,
  columnId: string,
  title: string,
  text: string,
  theme: string,
  importance: number
}

export type UpdateColumnType = {
  title: string,
  order: number
}

export type CreateBoardType = {
  title: string,
  owner: string,
  users: string[]
}

export type UpdateIssue = {
  boardId?: string | undefined;
  columnId: string;
  title: string;
  text: string;
  theme: string;
  importance: number;
  estimation: string;
  taskId: string;
  users:string[]
};

export interface UpdateIssueType {
  title: string;
  order: number;
  description: string;
  userId: number;
  columnId: string;
  users: string[];
}