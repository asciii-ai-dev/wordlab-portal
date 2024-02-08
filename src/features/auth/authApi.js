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

export const authApiSlice = createApi({
  baseQuery,
  reducerPath: "authentication",
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["auth"],
    }),
    loginSocial: builder.mutation({
      query: (credentials) => ({
        url: "/user/login-social",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["auth"],
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["auth"],
    }),
    requestOpt: builder.mutation({
      query: (credentials) => ({
        url: "/user/request-otp",
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["auth"],
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: "/user/verify-email",
        method: "PUT",
        body: { ...credentials },
      }),
      providesTags: ["auth"],
    }),
    forgetPass: builder.mutation({
      query: (credentials) => ({
        url: "/user/forget-pass",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    resetPass: builder.mutation({
      query: (credentials) => ({
        url: "/user/reset-pass",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/user/reset-pass-settings",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
    getUsersUsage: builder.query({
      query: () => ({
        url: "/user/usage",
        method: "GET",
      }),
    }),
    globalFeedback: builder.mutation({
      query: (credentials) => ({
        url: "/feedback/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRequestOptMutation,
  useVerifyEmailMutation,
  useLoginSocialMutation,
  useForgetPassMutation,
  useResetPassMutation,
  useGetUsersUsageQuery,
  useChangePasswordMutation,
  useGlobalFeedbackMutation
} = authApiSlice;
