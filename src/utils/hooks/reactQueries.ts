import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserType, BoardType, ColumnType, IssueType } from '../types';
import axios from 'axios';

const getRequest = async (url: string) =>
  await (
    await axios.get(url, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_BEARER_TOKEN as string
      }
    })
  ).data;

export const useGetBoardByIdQuery = (id?: string): UseQueryResult<BoardType, unknown> => {
  return useQuery(
    ['getBoardById', id],
    async () => await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`),
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
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

export const useGetBoardsSetByUserIdQuery = (id?: string): UseQueryResult<BoardType[], unknown> => {
  return useQuery(
    ['getBoardsSetByUserId', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/boardsSet/${id}`, {
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
    async () => await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/boards/${id}/columns`),
    {
      enabled: !!id
    }
  );
};

export const useGetBoardIssuesQuery = (id?: string): UseQueryResult<IssueType[], unknown> => {
  return useQuery(
    ['getIssuesByBoardId', id],
    async () =>
      await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasksSet/${id}`, {
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
    async () => await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/boards/${boardId}/columns/${columnId}/tasks`),
    {
      enabled: !!boardId && !!columnId
    }
  );
};
