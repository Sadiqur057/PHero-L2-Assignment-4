import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  tagTypes: ['book'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/books',
        params: { page, limit },
      }),
      providesTags: ['book'],
    }),
  }),
});

export const { useGetBooksQuery } = baseApi;
