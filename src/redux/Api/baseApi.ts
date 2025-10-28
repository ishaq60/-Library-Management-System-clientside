import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Books'], // optional, for cache invalidation
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
  
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url:"/books",
        method:"POST",
        body:bookData
      })
  
    }),
  }),
});

// Export the auto-generated hook
export const { useGetBooksQuery,useCreateBookMutation } = baseApi;
