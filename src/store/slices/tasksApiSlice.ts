import { apiSlice } from './apiSlice'
import { Task } from '../../@types'

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({
        url: '/tasks',
      }),
      transformResponse: (response: { data: Task[] }) => response.data,
    }),
    getTask: build.query<Task, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `/tasks/${taskId}`,
      }),
      transformResponse: (response: { data: Task }) => response.data,
    }),
  }),
})

export const { useGetTasksQuery, useGetTaskQuery } = boardsApiSlice
