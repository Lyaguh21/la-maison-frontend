import { baseApi } from "@/shared/api";
import {
  ICreateReservationRequest,
  IReservation,
  IReservationRangeQuery,
} from "../model/type";

export const reservationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReservationsInRange: build.query<IReservation[], IReservationRangeQuery>(
      {
        query: (params) => ({
          url: "/reservation/range",
          params,
        }),
        providesTags: [{ type: "Reservations" as const, id: "LIST" }],
      },
    ),

    getReservationsOnDayByTable: build.query<
      IReservation[],
      { day: string; tableId: number }
    >({
      query: ({ day, tableId }) => ({
        url: `/reservation/table/${tableId}/day`,
        params: { day },
      }),
      providesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),

    createReservation: build.mutation<IReservation, ICreateReservationRequest>({
      query: (data) => ({
        url: "/reservation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetReservationsInRangeQuery,
  useGetReservationsOnDayByTableQuery,
  useCreateReservationMutation,
} = reservationsApi;
