import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RequestPayloadType } from "../@types/types";

export const createFormApi = createApi({
  reducerPath: "createFormApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sbercloud.ru/",
  }),
  endpoints: (build) => ({
    setFormData: build.mutation<any, RequestPayloadType>({
      query: (payload: RequestPayloadType) => ({
        url: "content/v1/bootcampd/frontend",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useSetFormDataMutation } = createFormApi;
