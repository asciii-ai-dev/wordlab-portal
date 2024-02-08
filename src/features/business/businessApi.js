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

export const businessApiSlice = createApi({
  baseQuery,
  reducerPath: "business",
  tagTypes: ["Business"],
  endpoints: (builder) => ({
    registerBusiness: builder.mutation({
      query: (credentials) => ({
        url: "/business/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Business"],
    }),
    getBusiness: builder.query({
      query: () => ({
        url: `/business/get/`,
        method: "GET",
      }),
      invalidatesTags: ["Business"],
      transformResponse: (response, meta) => {
        // Modify the response data or extract specific values
        const transformedData = response?.data?.map((v) => ({
          id:v?._id,
          comp_name: v?.comp_name,
          status: v?.application_status,
          businessName: v?.comp_name,
          useCases: v?.use_cases,
          templates: v?.templates
        }));

        return transformedData;
      },
      providesTags: ["Business"],
    }),
  }),
});

export const { useRegisterBusinessMutation, useGetBusinessQuery } =
  businessApiSlice;
