import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Books'], // optional, for cache invalidation
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books',
  
    }),
  }),
});

// Export the auto-generated hook
export const { useGetBooksQuery } = baseApi;
