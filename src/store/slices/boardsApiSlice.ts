import { apiSlice } from './apiSlice'
import { Board, BoardTask } from '../../@types'

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getBoards: build.query<Board[], void>({
      query: () => ({
        url: '/boards',
      }),
      transformResponse: (response: { data: Board[] }) => response.data,
    }),
    getBoardTasks: build.query<BoardTask[], { boardId?: number }>({
      query: ({ boardId }) => ({
        url: `/boards/${boardId}`,
      }),
      transformResponse: (response: { data: BoardTask[] }) => response.data,
    }),
  }),
})

export const { useGetBoardsQuery, useGetBoardTasksQuery } = boardsApiSlice
