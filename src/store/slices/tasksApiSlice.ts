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
  }),
})

export const { useGetTasksQuery } = boardsApiSlice
