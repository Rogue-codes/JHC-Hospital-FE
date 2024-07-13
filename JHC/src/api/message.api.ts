import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages", "Conversations"],
  endpoints: (builder) => ({
    getCoversations: builder.query<any, any>({
      query: () => ({
        url: `/messages`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Conversations"],
    }),
    getMessage: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/message/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<any, { message: string; id: string }>({
      query: ({ id, ...payload }) => ({
        url: `/message/send/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Messages","Conversations"],
    }),
  }),
});

export const {
    useGetCoversationsQuery,useGetMessageQuery,useSendMessageMutation
} = messageApi;
