import { baseApi } from "@/shared/api";
import {
  IMetricValueResponse,
  IReservations7DaysResponse,
  IRevenue7DaysResponse,
  IWaitersProcessedStats,
} from "../model/type";

export const dashboardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    revenue7days: build.query<IRevenue7DaysResponse[], void>({
      query: () => "/dashboards/revenue/7-days",
      providesTags: [{ type: "Revenue", id: "LIST" }],
    }),

    revenueToday: build.query<IMetricValueResponse, void>({
      query: () => "/dashboards/revenue/today",
      providesTags: [{ type: "Revenue", id: "TODAY" }],
    }),

    reservations7days: build.query<IReservations7DaysResponse[], void>({
      query: () => "/dashboards/reservations/7-days",
      providesTags: [{ type: "Reservations", id: "LIST" }],
    }),

    reservationToday: build.query<IMetricValueResponse, void>({
      query: () => "/dashboards/reservations/today",
      providesTags: [{ type: "Reservations", id: "TODAY" }],
    }),

    waitersProcessedStats7Days: build.query<IWaitersProcessedStats[], void>({
      query: () => "/dashboards/waiter-processed/7-days",
      providesTags: [{ type: "Waiters", id: "LIST" }],
    }),
  }),
});

export const {
  useRevenue7daysQuery,
  useRevenueTodayQuery,
  useReservations7daysQuery,
  useReservationTodayQuery,
  useWaitersProcessedStats7DaysQuery,
} = dashboardsApi;
