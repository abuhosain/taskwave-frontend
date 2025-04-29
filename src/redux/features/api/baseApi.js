import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({baseUrl: "https://jsonplaceholder.typicode.com"}),
  endpoints:(builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    })
  })
});

export const { useGetPostsQuery } = baseApi;

export default baseApi;