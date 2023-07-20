import { UseMutationResult, UseQueryResult, useQuery, QueryClient, useQueryClient, useMutation } from 'react-query';
import { Board } from '../entity/Board'
import useBoardStore from '../store/BoardStore'
import axiosInstance from 'utility/axiosInstance';

export const fetchBoardList = async (): Promise<Board[]> => {
  const response = await axiosInstance.springAxiosInst.get<Board[]>('/board/list')
  return response.data
}

export const useBoardListQuery = (): UseQueryResult<Board[], unknown> => {
  const setBoards = useBoardStore((state) => state.setBoards)

  const queryResult: UseQueryResult<Board[], unknown> = useQuery('boardList', fetchBoardList, {
    onSuccess: (data) => {
      setBoards(data)
    }
  })

  return queryResult
}

// 등록 api
export const registerBoard = async (
  data: { title: string; content: string }
): Promise<Board> => {
  const response = await axiosInstance.springAxiosInst.post<Board>('/board/register', data, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export const fetchBoard = async (boardId: string): Promise<Board | null> => {
  const response = await axiosInstance.springAxiosInst.get<Board>(`/board/${boardId}`)
  return response.data
}

export const useBoardQuery = (boardId: string): UseQueryResult<Board | null, unknown> => {
  return useQuery(['board', boardId], () => fetchBoard(boardId))
}

export const updateBoard = async (updatedData: Board): Promise<Board> => {
  const { boardId, title, content, writer } = updatedData

  const response = await axiosInstance.springAxiosInst.put<Board>(
    `/jpa-board/${boardId}`, { title, content, writer })

  return response.data
}

export const useBoardUpdateMutation = (): UseMutationResult<Board, unknown, Board> => {
  const QueryClient = useQueryClient()

  return useMutation (updateBoard, {
    onSuccess: (data) => {
      QueryClient.setQueryData(['board', data.boardId], data)
    }
  })
}

export const deleteBoard = async (boardId: string): Promise<void> => {
  await axiosInstance.springAxiosInst.delete(`/board/${boardId}`)
}