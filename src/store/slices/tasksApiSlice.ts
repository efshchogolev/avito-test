import { apiSlice } from './apiSlice'
import { Task, TaskForCreate, TaskForUpdate } from '../../@types'

export const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Task[], void>({
      query: () => ({
        url: '/tasks',
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
      transformResponse: (response: { data: Task[] }) => response.data,
    }),
    getTask: build.query<Omit<Task, 'boardId'>, { taskId: number }>({
      query: ({ taskId }) => ({
        url: `/tasks/${taskId}`,
      }),
      transformResponse: (response: { data: Omit<Task, 'boardId'> }) =>
        response.data,
    }),
    createTask: build.mutation<{ id: number }, TaskForCreate>({
      query: (task) => ({
        url: `/tasks/create`,
        method: 'POST',
        body: { ...task },
      }),
      invalidatesTags: [{ type: 'Tasks' }],
    }),
    updateTask: build.mutation<
      { id: number },
      { taskId: number; task: TaskForUpdate }
    >({
      query: ({ task, taskId }) => ({
        url: `/tasks/update/${taskId}`,
        method: 'PUT',
        body: { ...task },
      }),
      invalidatesTags: [{ type: 'Tasks' }],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = boardsApiSlice
