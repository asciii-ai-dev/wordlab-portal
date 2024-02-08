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

export const settingsApiSlice = createApi({
  baseQuery,
  reducerPath: "settings",
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["Settings"],
    }),
    getUser: builder.query({
      query: () => ({
        url: `/user/get/info`,
        method: "GET",
      }),
      transformResponse: (response, meta) => {
        // Modify the response data or extract specific values
        const transformedData = response?.payload;

        return transformedData;
      },
      providesTags: ["Settings"],
    }),
  }),
});

export const { useUpdateProfileMutation, useGetUserQuery } = settingsApiSlice;
