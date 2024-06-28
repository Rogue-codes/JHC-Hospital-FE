import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
  ICreateAppointment,
  IReservationResponse,
} from "../interfaces/appointment.interface";

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
      { search: string; limit?: number; page: number; status?: string }
    >({
      query: ({ search, limit, page, status }) => ({
        url: `/reservations/all?search=${search}&page=${page}&limit=${limit}${
          status && `&status=completed`
        }`,
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
    rejectAppointment: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/reservation/reject/${id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Reservation"],
    }),
    rescheduleAppointment: builder.mutation<any, { time: string; id: string }>({
      query: ({ time, id }) => {
        console.log("Mutation payload:", { time }); // Debugging log
        return {
          url: `/reservation/reschedule/${id}`,
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: { time },
        };
      },
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useGetReservationByIdQuery,
  useGetReservationLogsQuery,
  useCreateAppointmentMutation,
  useRejectAppointmentMutation,
  useRescheduleAppointmentMutation,
} = reservationApi;
