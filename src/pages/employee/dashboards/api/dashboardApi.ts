import { baseApi } from "@/shared/api";
import {
  IDashboardWindow,
  IAverageVisitDurationResponse,
  IMetricValueResponse,
  IReservations7DaysResponse,
  IRevenue7DaysResponse,
  IWaitersProcessedStats,
} from "../model/type";

export const dashboardsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    revenue: build.query<IRevenue7DaysResponse[], IDashboardWindow | void>({
      query: (window = "week") => ({
        url: "/dashboards/revenue",
        params: { window },
      }),
      providesTags: [{ type: "Revenue", id: "LIST" }],
    }),

    revenueTotal: build.query<IMetricValueResponse, IDashboardWindow | void>({
      query: (window = "week") => ({
        url: "/dashboards/revenue/total",
        params: { window },
      }),
      providesTags: [{ type: "Revenue", id: "TODAY" }],
    }),

    reservations: build.query<
      IReservations7DaysResponse[],
      IDashboardWindow | void
    >({
      query: (window = "week") => ({
        url: "/dashboards/reservations",
        params: { window },
      }),
      providesTags: [{ type: "Reservations", id: "LIST" }],
    }),

    reservationsTotal: build.query<
      IMetricValueResponse,
      IDashboardWindow | void
    >({
      query: (window = "week") => ({
        url: "/dashboards/reservations/total",
        params: { window },
      }),
      providesTags: [{ type: "Reservations", id: "TODAY" }],
    }),

    waitersProcessedStats: build.query<
      IWaitersProcessedStats[],
      IDashboardWindow | void
    >({
      query: (window = "week") => ({
        url: "/dashboards/waiter-processed",
        params: { window },
      }),
      providesTags: [{ type: "Waiters", id: "LIST" }],
    }),

    averageVisitDuration: build.query<
      IAverageVisitDurationResponse,
      IDashboardWindow | void
    >({
      query: (window = "week") => ({
        url: "/dashboards/average-visit-duration",
        params: { window },
      }),
      providesTags: [{ type: "Reservations", id: "AVG_DURATION" }],
    }),
  }),
});

export const {
  useRevenueQuery,
  useRevenueTotalQuery,
  useReservationsQuery,
  useReservationsTotalQuery,
  useWaitersProcessedStatsQuery,
  useAverageVisitDurationQuery,
} = dashboardsApi;
