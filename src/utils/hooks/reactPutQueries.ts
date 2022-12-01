import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateColumnType } from '../types';

const putRequest = async <T>(url: string, body: T) =>
  await (
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`,
        'Content-Type': 'application/json'
      }
    })
  ).data;


export const useUpdateColumnMutation = () => {
  return useMutation({
    mutationFn: async ({ boardId, columnId, title }: { boardId: string, columnId: string, title: string }) => {
      return await putRequest<UpdateColumnType>(`/boards/${boardId}/columns/${columnId}`,
        {
          title: title,
          order: 0
        }
      )
    }
  });
};
