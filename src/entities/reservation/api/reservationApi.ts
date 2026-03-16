import { baseApi } from "@/shared/api";
import {
  ICreateReservationRequest,
  IReservation,
  IReservationRangeQuery,
  IReservationStatus,
  IUpdateStatusReservationQuery,
} from "../model/type";

export const reservationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReservation: build.mutation<IReservation, ICreateReservationRequest>({
      query: (data) => ({
        url: "/reservation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),

    getAllReservationsOnDay: build.query<
      IReservation[],
      { day: string; status?: IReservationStatus | IReservationStatus[] }
    >({
      query: (params) => ({
        url: "/reservation",
        params,
      }),
      providesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),

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

    updateStatusReservation: build.mutation<
      IReservation,
      IUpdateStatusReservationQuery
    >({
      query: ({ id, status }) => ({
        url: `/reservation/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),

    updateReservation: build.mutation<
      IReservation,
      Partial<ICreateReservationRequest> & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `/reservation/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Reservations" as const, id: "LIST" }],
    }),
  }),
});

export const {
  useGetReservationsInRangeQuery,
  useGetReservationsOnDayByTableQuery,
  useUpdateReservationMutation,
  useCreateReservationMutation,
  useGetAllReservationsOnDayQuery,
  useUpdateStatusReservationMutation,
} = reservationsApi;
