import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LogInType } from '../types';

const postRequest = async <T>(url: string, body: T) =>
  await (
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body)
  ).data;

export const useLogInMutation = () => {
  return useMutation({
    mutationFn: async (logInData: LogInType) => {
      return await postRequest<LogInType>('/auth/signin', {
        login: logInData.login,
        password: logInData.password
      });
    }
  });
};
