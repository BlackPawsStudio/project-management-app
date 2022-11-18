import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BoardType } from '../types';

export const useGetBoardByIdQuery = (id?: string): UseQueryResult<BoardType, unknown> => {
  return useQuery(
    ['getBoardById', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzZjOTlkNWI5YzczODExYzFmOTUyOCIsImxvZ2luIjoiSU1hc2siLCJpYXQiOjE2Njg3MjkzMDUsImV4cCI6MTY2ODc3MjUwNX0.XkfuOLpZe5MsHnKbGBlksZs1un2-3VY0OUKSWdrpMJw'
          }
        })
      ).json(),
    {
      enabled: !!id
    }
  );
};
