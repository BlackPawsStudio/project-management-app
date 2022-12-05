import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const patchRequest = async <T>(url: string, body: T) =>
  await (
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('nextBoardUserToken')}`,
        'Content-Type': 'application/json'
      }
    })
  ).data;

export interface PatchIssue {
  _id: string;
  order: number;
  columnId: string;
}

export const usePatchIssueMutation = () => {
  return useMutation({
    mutationFn: async (body: PatchIssue[]) => {
      return await patchRequest<PatchIssue[]>('/tasksSet', body);
    }
  });
};
