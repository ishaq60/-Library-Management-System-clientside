import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-five-sable.vercel.app/api' }),
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



  }),
  
});

export const {
  useGetBooksQuery,
    useGetBorrowQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowMutation

} = baseApi;
