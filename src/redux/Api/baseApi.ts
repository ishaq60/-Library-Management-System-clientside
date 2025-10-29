import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'baseUrl:import.meta.env.VITE_API_BASE_URL'}),
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
  invalidatesTags: ["Books"], 
}),
 getBorrow: builder.query({
      query: () => '/borrow',
      providesTags: ['Books'],
    }),

createBorrow: builder.mutation({
  query: (borrowData) => ({
    url: "/borrow",
    method: "POST",
    body: borrowData, // direct JSON: { book, quantity, dueDate }
  }),
  invalidatesTags: ["Books"],
}),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }],
    }),


  }),
  
});

export const {
  useGetBooksQuery,
    useGetBorrowQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation,
  useGetBookByIdQuery

} = baseApi;
