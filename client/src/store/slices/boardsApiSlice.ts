import { apiSlice } from './apiSlice.ts'
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
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Tasks' as const,
                id,
              })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
      transformResponse: (response: { data: BoardTask[] }) => response.data,
    }),
  }),
})

export const { useGetBoardsQuery, useGetBoardTasksQuery } = boardsApiSlice
