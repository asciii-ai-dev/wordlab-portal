import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";
import { templatesData } from "../../utils/data/templates";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  //   credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});

const streamingFetch = async (credentials, {  dispatch, getState }) => {
  const url = `/output/generate-test`;
  const method = 'POST';

  try {
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      responseType: 'stream',
    });

    const response = await axiosInstance.request({
      url,
      method,
      data: {
        template_id: credentials?.template_id,
        form_fields: credentials?.form_fields,
      },
    });

    // Dispatch actions or handle the stream as needed
    dispatch({ type: 'stream/fetchData/success', payload: { stream: response.data } });
  } catch (error) {
    // Handle errors
    dispatch({ type: 'stream/fetchData/error', error: error.message });
  }
};

export const templatesApiSlice = createApi({
  baseQuery,
  reducerPath: "templates",
  tagTypes: ["Templates", "VotingFeedback"],
  endpoints: (builder) => ({
    streamTemplate: builder.mutation({
      query: streamingFetch, // Use the custom function for streaming
      invalidatesTags: ['Templates'],
    }),
    templateOutput: builder.mutation({
      query: (credentials) => ({
        url: `/output/generate${credentials?.query || ""}`,
        method: "POST",
        body: {
          template_id: credentials?.template_id,
          form_fields: credentials?.template_id === "comparison-article" ? {
            urls: [credentials?.form_fields?.url1, credentials?.form_fields?.url2]
          } : credentials?.form_fields
        },
      }),
      invalidatesTags: ["Templates"],
    }),
    votingFeedback: builder.mutation({
      query: (credentials) => ({
        url: "/voting-feedback/create",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["VotingFeedback"],
    }),
    recentOutputs: builder.query({
      query: ({ limit, template_id }) => ({
        url: `/output/fetch-recent/${template_id}?limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result, error, { limit = 10, template_id }) => [
        { type: "Templates", id: `recent/${template_id}` },
        {
          type: "Templates",
          id: `recent/${template_id}`,
          page: Math.ceil(limit / 10),
        },
      ],
      invalidatesTags: ["Templates"],
    }),
    savePreset: builder.mutation({
      query: (credentials) => ({
        url: "/user-input/add",
        method: "POST",
        body: credentials,
      }),
    }),
    deletePreset: builder.mutation({
      query: ({id}) => ({
        url: `/user-input/delete/${id}`,
        method: "DELETE",
      }),
    }),
    fetchAllPresets: builder.query({
      query: ({ template_id }) => ({
        url: `/user-input/fetch/${template_id}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => {
        return data.map((item) => ({
          value: item._id,
          label: item.title,
        }));
      },
    }),
    fetchPreset: builder.query({
      query: ({ preset_id }) => ({
        url: `/user-input/get/${preset_id}`,
        method: "GET",
      }),
    }),
    fetchUserPlanInfo: builder.query({
      query: () => ({
        url: `/user/subscription-info`,
        method: "GET",
      }),
      transformResponse: (response, meta) => {
        const tempId = response?.payload?.supported_templates || [];
        return {
          ...response?.payload,
          supported_templates: templatesData?.filter((v) => tempId.includes(v?.template_id)),
         
        }
      },
    }),
    addToFavorite: builder.mutation({
      query: (credentials) => ({
        url: "/user/template/add-favourite",
        method: "PUT",
        body: credentials,
      }),
    }),
    removeFromFavorite: builder.mutation({
      query: (credentials) => ({
        url: "/user/template/remove-favourite",
        method: "PUT",
        body: credentials,
      }),
    }),
    fetchFavorites: builder.query({
      query: () => ({
        url: `/user/favourite-templates`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTemplateOutputMutation,
  useRecentOutputsQuery,
  useVotingFeedbackMutation,
  useSavePresetMutation,
  useFetchAllPresetsQuery,
  useFetchPresetQuery,
  useFetchUserPlanInfoQuery,
  useAddToFavoriteMutation,
  useFetchFavoritesQuery,
  useRemoveFromFavoriteMutation,
  useDeletePresetMutation,
  useStreamTemplateMutation
} = templatesApiSlice;
