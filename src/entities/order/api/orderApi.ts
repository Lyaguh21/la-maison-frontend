import { baseApi } from "@/shared/api";
import {
  ICreateOrder,
  IOrderCookingResponse,
  IUpdateOrderItemStatus,
} from "../model/type";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orderCooking: build.query<IOrderCookingResponse[], void>({
      query: () => "/orders/cooking",
      providesTags: [{ type: "OrderCooking", id: "LIST" }],
    }),

    orderArchive: build.query<IOrderCookingResponse[], void>({
      query: () => "/orders/archive",
      providesTags: [{ type: "OrderArchive", id: "LIST" }],
    }),

    createOrder: build.mutation<void, ICreateOrder>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "OrderCooking", id: "LIST" },
        { type: "Reservations", id: "LIST" },
      ],
    }),

    updateOrderItemStatus: build.mutation<
      void,
      IUpdateOrderItemStatus & { id: number }
    >({
      query: ({ id, ...updateData }) => ({
        url: `/orders/items/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "OrderCooking", id: "LIST" },
        { type: "OrderArchive", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useOrderCookingQuery,
  useOrderArchiveQuery,
  useUpdateOrderItemStatusMutation,
  useCreateOrderMutation,
} = orderApi;
