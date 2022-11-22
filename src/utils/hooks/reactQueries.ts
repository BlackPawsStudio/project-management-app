import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserType, BoardType, ColumnType, IssueType } from '../types';

export const useGetBoardByIdQuery = (id?: string): UseQueryResult<BoardType, unknown> => {
  return useQuery(
    ['getBoardById', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN as string
          }
        })
      ).json(),
    {
      enabled: !!id
    }
  );
};

export const useGetUserByIdQuery = (id?: string): UseQueryResult<UserType, unknown> => {
  return useQuery(
    ['getUserById', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN as string
          }
        })
      ).json(),
    {
      enabled: !!id
    }
  );
};

export const useGetBoardColumnsQuery = (id?: string): UseQueryResult<ColumnType[], unknown> => {
  return useQuery(
    ['getColumnsByBoardId', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${id}/columns`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN as string
          }
        })
      ).json(),
    {
      enabled: !!id
    }
  );
};

export const useGetColumnIssuesQuery = (boardId?: string, columnId?: string): UseQueryResult<IssueType[], unknown> => {
  return useQuery(
    ['getIssuesByColumnId', boardId],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN as string
          }
        })
      ).json(),
    {
      enabled: !!boardId && !!columnId
    }
  );
};
