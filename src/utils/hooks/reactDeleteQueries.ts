import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const deleteRequest = async (url: string) =>
  await (
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`
      }
    })
  ).data;

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await deleteRequest(`/users/${id}`);
    }
  });
};

export const useDeleteBoardMutation = () => {
  return useMutation({
    mutationFn: async (boardId: string) => {
      return await deleteRequest(`/boards/${boardId}`);
    }
  });
};

export const useDeleteColumnMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId }: { boardId: string; columnId: string }) => {
      return await deleteRequest(`/boards/${boardId}/columns/${columnId}`);
    }
  });
};

export const useDeleteTaskMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, taskId }: { boardId: string; columnId: string; taskId: string }) => {
      return await deleteRequest(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
    }
  });
};
