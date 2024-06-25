/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {
  ICreatePatient,
  IPatientResponse,
  IUpdatePatient,
} from "../interfaces/patientfee.interface";

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
      { search: string; limit?: number; page?: number }
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
    postPatient: builder.mutation<any, ICreatePatient>({
      query: (payload) => ({
        url: `/patient/create`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Patient"],
    }),
    validatePatientEmail: builder.mutation<any, { value: string }>({
      query: ({ value }) => ({
        url: `/patient/validate?email=${value}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    validatePatientPhone: builder.mutation<any, { value: string }>({
      query: ({ value }) => ({
        url: `/patient/validate?phone=${value}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getPatientById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/patient/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updatePatient: builder.mutation<
      any,
      { payload: IUpdatePatient; id: string }
    >({
      query: ({ id, payload }) => ({
        url: `/patient/update/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Patient"],
    }),
    getPatientLogs: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/patient/logs/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    searchPatients: builder.query<any, { search: string }>({
      query: ({ search }) => ({
        url: `/patient?search=${search}`,
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
  usePostPatientMutation,
  useValidatePatientEmailMutation,
  useValidatePatientPhoneMutation,
  useUpdatePatientMutation,
  useSearchPatientsQuery,
} = patientsApi;
