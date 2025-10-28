import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
      providesTags: ['Books'],
    }),

    createBook: builder.mutation({
      query: (bookData) => ({
        url: '/books',
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['Books'],
    }),

    // ✅ lowercase endpoint name
    updateBook: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: updateData,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation({
  query: (id) => ({
    url: `/books/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Books"], // auto-refresh book list
}),

  }),
  
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = baseApi;
