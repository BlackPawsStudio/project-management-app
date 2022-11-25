import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserType, BoardType, ColumnType, IssueType } from '../types';
import axios from 'axios';

const getRequest = async (url: string) =>
  await (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
  ).data;

export const useGetBoardByIdQuery = (id?: string): UseQueryResult<BoardType, unknown> => {
  return useQuery(['getBoardById', id], async () => await getRequest(`/boards/${id}`), {
    enabled: !!id
  });
};

export const useGetUserByIdQuery = (id?: string): UseQueryResult<UserType, unknown> => {
  return useQuery(['getUserById', id], async () => await getRequest(`/users/${id}`), {
    enabled: !!id
  });
};

export const useGetBoardsSetByUserIdQuery = (id?: string): UseQueryResult<BoardType[], unknown> => {
  return useQuery(['getBoardsSetByUserId', id], async () => await getRequest(`/boardsSet/${id}`), {
    enabled: !!id
  });
};

export const useGetBoardColumnsQuery = (id?: string): UseQueryResult<ColumnType[], unknown> => {
  return useQuery(['getColumnsByBoardId', id], async () => await getRequest(`/boards/${id}/columns`), {
    enabled: !!id
  });
};

export const useGetBoardIssuesQuery = (id?: string): UseQueryResult<IssueType[], unknown> => {
  return useQuery(['getIssuesByBoardId', id], async () => await getRequest(`/tasksSet/${id}`), {
    enabled: !!id
  });
};

export const useGetColumnIssuesQuery = (boardId?: string, columnId?: string): UseQueryResult<IssueType[], unknown> => {
  return useQuery(
    ['getIssuesByColumnId', boardId],
    async () => await getRequest(`/boards/${boardId}/columns/${columnId}/tasks`),
    {
      enabled: !!boardId && !!columnId
    }
  );
};
