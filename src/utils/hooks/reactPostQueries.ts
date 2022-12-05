import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateBoardType, CreateColumnType, CreateIssueType, Issue, LogInType as AuthType } from '../types';

const postRequest = async <T>(url: string, body: T) =>
  await (
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`,
        'Content-Type': 'application/json'
      }
    })
  ).data;

export const useLogInMutation = () => {
  return useMutation({
    mutationFn: async (logInData: AuthType) => {
      try {
        return await postRequest<AuthType>('/auth/signin', {
          login: logInData.login,
          password: logInData.password
        });
      } catch {}
    }
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (logInData: AuthType) => {
      try {
        return await postRequest<AuthType>('/auth/signup', {
          name: logInData.name,
          login: logInData.login,
          password: logInData.password
        });
      } catch {}
    }
  });
};

export const useCreateColumnMutation = () => {
  return useMutation({
    mutationFn: async ({ id, BoardData }: { id?: string | string[]; BoardData: CreateColumnType }) => {
      return await postRequest<CreateColumnType>(`/boards/${id}/columns`, {
        title: BoardData.title,
        order: BoardData.order
      });
    }
  });
};

export const useCreateBoardMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return await postRequest<CreateBoardType>(`/boards`, {
        title: 'New board',
        owner: id,
        users: [id]
      });
    }
  });
};

export const useCreateIssueMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, title, text, theme, importance, order }: Issue) => {
      return await postRequest<CreateIssueType>(`/boards/${boardId}/columns/${columnId}/tasks`, {
        title: title,
        order: order,
        description: JSON.stringify({
          text: text,
          importance: importance,
          estimation: '0',
          theme: theme
        }),
        userId: 0,
        users: [localStorage.getItem('nextBoardUserId') as string]
      });
    }
  });
};
