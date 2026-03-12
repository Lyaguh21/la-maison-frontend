import { baseApi } from "@/shared/api";
import type { FloorItemDto, SyncFloorItemDto } from "./type";

export const floorItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFloorItems: build.query<FloorItemDto[], void>({
      query: () => "/floor-items",
      providesTags: [{ type: "FloorItems", id: "LIST" }],
    }),
    getTables: build.query<
      { id: number; number: number; tableType: string }[],
      void
    >({
      query: () => "/tables",
      providesTags: [{ type: "FloorItems", id: "TABLES" }],
    }),
    syncFloorItems: build.mutation<
      FloorItemDto[],
      { items: SyncFloorItemDto[] }
    >({
      query: (body) => ({
        url: "/floor-items/sync",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "FloorItems", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFloorItemsQuery,
  useSyncFloorItemsMutation,
  useGetTablesQuery,
} = floorItemsApi;
