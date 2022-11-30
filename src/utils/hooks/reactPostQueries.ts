import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { CreateColumnType, LogInType as AuthType } from '../types';

const postRequest = async <T>(url: string, body: T) =>
  await (
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`,
        "Content-Type": "application/json"
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
}


export const useCreateColumnMutation = () => {
  return useMutation({
    mutationFn: async ({ id, BoardData }: { id?: string | string[], BoardData: CreateColumnType }) => {
      return await postRequest<CreateColumnType>(`/boards/${id}/columns`, {
        title: BoardData.title,
        order: BoardData.order
      });
    }
  });
}

type IssueDescription = {
  text: string,
  importance: string,
  estimation: string,
  theme: string
}

interface createIssueType {
  title: string,
  order: number,
  description: string,
  userId: number,
  users: string[]
}

export const useCreateIssueMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId }: { boardId?: string, columnId: string }) => {
      return await postRequest<createIssueType>(`/boards/${boardId}/columns/${columnId}/tasks`,
        {
          title: "string",
          order: 0,
          description: JSON.stringify({
            text: "string",
            importance: "string",
            estimation: "string",
            theme: "string"
          }),
          userId: 0,
          users: [
            "string"
          ]
        }
      )
    }
  });
}