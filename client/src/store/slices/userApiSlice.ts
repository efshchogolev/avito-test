import { apiSlice } from './apiSlice.ts'
import { User } from '../../@types'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => ({
        url: '/users',
      }),
      transformResponse: (response: { data: User[] }) => response.data,
    }),
  }),
})

export const { useGetUsersQuery } = userApiSlice
