/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IPatientResponse } from "../interfaces/patientfee.interface";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const patientsApi = createApi({
  reducerPath: "patientsApi",
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
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    getPatients: builder.query<
      IPatientResponse,
      { search: string; limit?: number; page: number }
    >({
      query: ({ search, limit, page }) => ({
        url: `/patients/all?search=${search}&page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Patient"],
    }),
    // postDoctor: builder.mutation<any, ICreateDoctor>({
    //   query: (payload) => ({
    //     url: `/doctor/create`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Doctor"],
    // }),
    // validateDoctorEmail: builder.mutation<any, { value: string }>({
    //   query: ({ value }) => ({
    //     url: `/doctor/validate?email=${value}`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    // }),
    // validateDoctorPhone: builder.mutation<any, { value: string }>({
    //   query: ({ value }) => ({
    //     url: `/doctor/validate?phone=${value}`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    // }),
    // changeDoctorStatus: builder.mutation<any, { id: string }>({
    //   query: ({ id }) => ({
    //     url: `/doctor/change-status/${id}`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   invalidatesTags: ["Doctor"],
    // }),
    getPatientById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/patient/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    // updateDoctor: builder.mutation<any, IUpdateDoctor>({
    //   query: ({ _id, ...payload }) => ({
    //     url: `/doctor/update/${_id}`,
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Doctor"],
    // }),
    getPatientLogs: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/patient/logs/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetPatientsQuery,
  useGetPatientByIdQuery,
  useGetPatientLogsQuery,
} = patientsApi;
