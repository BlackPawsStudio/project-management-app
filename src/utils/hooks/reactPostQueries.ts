import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LogInType as AuthType } from '../types';

const postRequest = async <T>(url: string, body: T) =>
  await (
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body)
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