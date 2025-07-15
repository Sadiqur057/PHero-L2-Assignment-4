import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api11.vercel.app/api",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/books",
        params: { page, limit },
      }),
      providesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...updatedBook }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: updatedBook.formData,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    borrowBook: builder.mutation({
      query: ({ book, quantity, dueDate }) => ({
        url: `/borrow`,
        method: "POST",
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ["book"],
    }),
    getSummary: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/borrow",
        params: { page, limit },
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetBookByIdQuery,
  useBorrowBookMutation,
  useGetSummaryQuery,
} = baseApi;
