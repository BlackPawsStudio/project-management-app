import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateBoardType, UpdateColumnType, UpdateIssue, UpdateIssueType } from '../types';

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

export const useUpdateIssueMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, title, text, theme, importance, estimation, taskId, users }: UpdateIssue) => {
      return await putRequest<UpdateIssueType>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        title: title,
        order: 0,
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
