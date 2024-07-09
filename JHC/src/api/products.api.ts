import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IProduct, IProductResponse } from "../interfaces/inventory.interface";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const productsApi = createApi({
  reducerPath: "productsApi",
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
  tagTypes: ["Products", "Manufacturers"],
  endpoints: (builder) => ({
    getProducts: builder.query<
      IProductResponse,
      {
        search: string;
        category: string;
        limit?: number;
        page: number;
        stock: string;
        manufacturer: string;
      }
    >({
      query: ({ search, limit, page, category, stock, manufacturer }) => ({
        url: `/products/all?search=${search}&page=${page}&limit=${limit}&category=${category}&stock=${stock}&manufacturer=${manufacturer}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Products"],
    }),
    getManufacturers: builder.query<
      { success: boolean; message: string; data: string[] },
      any
    >({
      query: () => ({
        url: `/products/manufacturers`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Manufacturers"],
    }),
    // getReservationLogs: builder.query<any, { id: string }>({
    //   query: ({ id }) => ({
    //     url: `/reservation/logs/${id}`,
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json; charset=UTF-8",
    //     },
    //   }),
    // }),
    getProductById: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
    }),
    createProduct: builder.mutation<any, IProduct>({
      query: (payload) => ({
        url: `/product/create`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Products", "Manufacturers"],
    }),
    createBulkProduct: builder.mutation<any, FormData>({
      query: (payload) => ({
        url: `/product/bulk-create`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: payload,
      }),
      invalidatesTags: ["Products", "Manufacturers"],
    }),
    // deleteProduct: builder.mutation<any, {id: string }>({
    //   query: ({ id }) => ({
    //     url: `/product/update/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }),
    //   invalidatesTags: ["Products"],
    // }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useGetManufacturersQuery, useCreateBulkProductMutation, useGetProductByIdQuery } = productsApi;
