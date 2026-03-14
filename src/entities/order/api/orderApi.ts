import { baseApi } from "@/shared/api";
import { IOrderCookingResponse, IUpdateOrderItemStatus } from "../model/type";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    orderCooking: build.query<IOrderCookingResponse[], void>({
      query: () => "/orders/cooking",
      providesTags: [{ type: "OrderCooking", id: "LIST" }],
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
      ],
    }),
  }),
});

export const { useOrderCookingQuery, useUpdateOrderItemStatusMutation } =
  orderApi;
