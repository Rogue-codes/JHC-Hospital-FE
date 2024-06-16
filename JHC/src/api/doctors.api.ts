/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICreateDoctor } from "../interfaces/doctor.interface";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const doctorsApi = createApi({
  reducerPath: "doctorsApi",
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
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    getDoctors: builder.query<
      any,
      { search: string; limit?: number; page: number }
    >({
      query: ({ search, limit, page }) => ({
        url: `/doctors/all?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Doctor"],
    }),
    postDoctor: builder.mutation<any, ICreateDoctor>({
      query: (payload) => ({
        url: `/doctor/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Doctor"],
    }),
    validateDoctorEmail: builder.mutation<any, { value: string }>({
      query: ({ value }) => ({
        url: `/doctor/validate?email=${value}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    validateDoctorPhone: builder.mutation<any, { value: string }>({
      query: ({ value }) => ({
        url: `/doctor/validate?phone=${value}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    changeDoctorStatus: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/doctor/change-status/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Doctor"],
    }),
    getDoctorById: builder.query<
      any,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/doctor/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  usePostDoctorMutation,
  useValidateDoctorEmailMutation,
  useValidateDoctorPhoneMutation,
  useChangeDoctorStatusMutation,
  useGetDoctorByIdQuery
} = doctorsApi;
