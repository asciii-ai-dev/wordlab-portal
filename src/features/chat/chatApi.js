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

const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    // Set Content-Type to multipart/form-data for the specific route
    headers.set("Content-Type", "multipart/form-data");
    return headers;
  },
});

export const chatApiSlice = createApi({
  baseQuery,
  reducerPath: "chat",
  tagTypes: ["chat"],
  endpoints: (builder) => ({
    normalConverse: builder.mutation({
      query: (credentials) => ({
        url: "/chat/converse",
        method: "POST",
        body: credentials,
      }),
    }),
    googleSearch: builder.mutation({
      query: (credentials) => ({
        url: "/chat/converse/google-search",
        method: "POST",
        body: credentials,
      }),
    }),
    liveContext: builder.mutation({
      query: (credentials) => ({
        url: "/chat/converse/live-site-search",
        method: "POST",
        body: credentials,
      }),
    }),
    chatWithImage: builder.mutation({
      query: (credentials) => ({
        url: "/chat/converse/image-search",
        method: "POST",
        body: credentials,
      }),
      baseQuery: customBaseQuery
    }),
    getChat: builder.query({
      query: ({step=1}) => ({
        url: `/chat/fetch/?limit=2&step=${step}`,
        method: "GET",
      }),
      // providesTags:["chat" ]
    }),
    clearChat: builder.mutation({
      query: (credentials) => ({
        url: "/chat/clear",
        method: "DELETE",
        body: credentials,
        
      }),
      // invalidatesTags:["chat"]
    }),
    
  }),
});

export const {
  useGetChatQuery,
  useClearChatMutation,
  useGoogleSearchMutation,
  useLiveContextMutation,
  useNormalConverseMutation,
  useChatWithImageMutation
} = chatApiSlice;
