import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateColumnType, CreateIssueType, LogInType as AuthType } from '../types';

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
      return await postRequest<AuthType>('/auth/signin', {
        login: logInData.login,
        password: logInData.password
      });
    }
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (logInData: AuthType) => {
      return await postRequest<AuthType>('/auth/signup', {
        name: logInData.name,
        login: logInData.login,
        password: logInData.password
      });
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

type Issue = {
  boardId?: string;
  columnId: string;
  title: string;
  text: string;
  theme: string;
  importance: string;
};

export const useCreateIssueMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, title, text, theme, importance }: Issue) => {
      return await postRequest<CreateIssueType>(`/boards/${boardId}/columns/${columnId}/tasks`, {
        title: title,
        order: 0,
        description: JSON.stringify({
          text: text,
          importance: importance,
          estimation: 'string',
          theme: theme
        }),
        userId: 0,
        users: ['string']
      });
    }
  });
};
