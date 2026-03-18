import { baseApi } from "@/shared/api";
import { ITable } from "../model/type";

export const tableApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTables: build.query<ITable[], void>({
      query: () => "/tables",
      providesTags: [{ type: "Table", id: "LIST" }],
    }),
    getFreeTables: build.query<
      ITable[],
      { startTime: string; endTime: string }
    >({
      query: ({ startTime, endTime }) => ({
        url: "/tables/freetables",
        params: { startTime, endTime },
      }),
    }),
  }),
});

export const { useGetAllTablesQuery, useGetFreeTablesQuery } = tableApi;
