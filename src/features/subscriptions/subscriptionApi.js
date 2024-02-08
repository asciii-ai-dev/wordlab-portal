import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";
import moment from "moment/moment";

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

export const subscriptionApiSlice = createApi({
  baseQuery,
  reducerPath: "subscription",
  tagTypes: ["subscribe"],
  endpoints: (builder) => ({
    manageSubscription: builder.mutation({
      query: (credentials) => ({
        url: "/subscription/manage-subscriptions",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["subscribe"],
    }),
    getUserActiveSubscription: builder.mutation({
      query: (credentials) => ({
        url: `/subscription/user-subscription`,
        method: "POST",
        body: credentials,
      }),
      providesTags: ["subscribe"],
    }),
    getInvoices: builder.query({
      query: (credentials) => ({
        url: `/subscription/user-invoices`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta) => {
        // Modify the response data or extract specific values
        const transformedData = response?.invoices?.map((v) => ({
          amount: `$${(v?.amount_paid / 100).toFixed(2)}`,
          date: moment.unix(v?.created).format("DD/MM/YYYY"),
          details: v?.billing_reason,
          invoicePdf: v?.invoice_pdf,
        }));

        return transformedData;
      },
      providesTags: ["subscribe"],
    }),
    ifUserSubscribed: builder.query({
      query: (credentials) => ({
        url: `/subscription/check-user-sub`,
        method: "POST",
        body: credentials,
      }),
      providesTags: ["subscribe"],
    }),
    getStripeProducts: builder.query({
      query: (credentials) => ({
        url: `/subscription/products`,
        method: "GET",
        body: credentials,
      }),
      providesTags: ["subscribe"],
    }),
    buyBundle: builder.mutation({
      query: (credentials) => ({
        url: "/user/buy-bundle",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["subscribe"],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetStripeProductsQuery,
  useGetUserActiveSubscriptionMutation,
  useManageSubscriptionMutation,
  useIfUserSubscribedQuery,
  useBuyBundleMutation
} = subscriptionApiSlice;
