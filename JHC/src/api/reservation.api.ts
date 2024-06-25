import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ICreateAppointment, IReservationResponse } from "../interfaces/appointment.interface";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const reservationApi = createApi({
  reducerPath: "reservationApi",
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
  tagTypes: ["Reservation"],
  endpoints: (builder) => ({
    getReservations: builder.query<
      IReservationResponse,
      { search: string; limit?: number; page: number }
    >({
      query: ({ search, limit, page }) => ({
        url: `/reservations/all?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Reservation"],
    }),
    getReservationLogs: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/reservation/logs/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getReservationById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/reservation/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createAppointment: builder.mutation<any, ICreateAppointment>({
      query: (payload) => ({
        url: `/reservation/create`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
    useGetReservationsQuery,
    useGetReservationByIdQuery,
    useGetReservationLogsQuery,
    useCreateAppointmentMutation
} = reservationApi;