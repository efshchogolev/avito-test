import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../constants'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
})

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: [
    'Addresses',
    'AddressTypes',
    'User',
    'Company',
    'Vending',
    'Team',
    'UnitSettings',
  ],
  endpoints: () => ({}),
})
