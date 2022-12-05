import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateBoardType, UpdateColumnType } from '../types';

const putRequest = async <T>(url: string, body: T) =>
  await (
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`,
        'Content-Type': 'application/json'
      }
    })
  ).data;

export const useUpdateBoardMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, title, owner, users }: CreateBoardType & { boardId: string }) => {
      return await putRequest<CreateBoardType>(`/boards/${boardId}`, {
        title: title,
        owner: owner,
        users: users
      });
    }
  });
};

export const useUpdateColumnMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, title }: UpdateColumnType & { boardId: string; columnId: string }) => {
      return await putRequest<UpdateColumnType>(`/boards/${boardId}/columns/${columnId}`, {
        title: title,
        order: 0
      });
    }
  });
};

export interface UpdateIssue {
  boardId?: string | undefined;
  columnId: string;
  title: string;
  text: string;
  theme: string;
  importance: number;
  estimation: string;
  taskId: string;
  users: string[];
  order: number;
}

export interface UpdateIssueType {
  title: string;
  order: number;
  description: string;
  userId: number;
  columnId: string;
  users: string[];
}

export const useUpdateIssueMutation = () => {
  return useMutation({
    mutationFn: async ({
      boardId,
      columnId,
      title,
      text,
      theme,
      importance,
      estimation,
      taskId,
      users,
      order
    }: UpdateIssue) => {
      return await putRequest<UpdateIssueType>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        title: title,
        order: order,
        description: JSON.stringify({
          text: text,
          importance: importance,
          estimation: estimation,
          theme: theme
        }),
        columnId: columnId,
        userId: 0,
        users: users
      });
    }
  });
};
