import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  //   credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", "Bearer " + token);
      // headers.set("Content-Type", "multipart/form-data");
    }
    return headers;
  },
});

export const documentApiSlice = createApi({
  baseQuery,
  reducerPath: "documents",
  tagTypes: ["Documents"],
  endpoints: (builder) => ({
    documentSave: builder.mutation({
      query: (credentials) => ({
        url: "/document-state/save",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Documents"],
    }),
    documentFetch: builder.query({
      query: () => ({
        url: `/document-state/fetch`,
        method: "GET",
      }),
      providesTags: ["Documents"],
    }),
    
  }),
});

export const {
  useDocumentSaveMutation,
  useDocumentFetchQuery
} = documentApiSlice;
