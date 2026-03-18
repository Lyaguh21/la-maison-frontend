import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Menu",
    "MenuCategory",
    "Ingredients",
    "FloorItems",
    "Revenue",
    "Reservations",
    "Waiters",
    "OrderCooking",
    "OrderArchive",
    "OrderReady",
    "Order",
    "Table",
    "MyArchiveReservations",
    "MyReservations",
  ],
  endpoints: () => ({}),
});
