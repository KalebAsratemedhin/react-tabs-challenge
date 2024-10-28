
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tabsApi = createApi({
  reducerPath: 'tabs',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTabs: builder.query({
      query: () => {
        return {
          url: '',
          method: "GET",
          responseHandler: 'text'
        };
      },
      transformResponse: (response) => {
        const plainText = response.replace(/<\/?[^>]+(>|$)/g, ""); 
        return plainText;

      },
    }),
  }),
});

export const { useGetTabsQuery } = tabsApi;

