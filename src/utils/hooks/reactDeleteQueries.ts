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
