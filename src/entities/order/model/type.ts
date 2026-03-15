import { IDish } from "@/entities/dish";
import { IReservation } from "@/entities/reservation";

type IOrderStatus = "COOKING" | "READY" | "SERVED";

export interface IOrderItem {
  id: number;
  orderId: number;
  dishId: number;
  comment?: string | null;
  quantity: number;
  priceSnapshot: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  dish: IDish;
}

export interface IOrderCookingResponse {
  id: number;
  reservationId: number;
  reservation: Pick<IReservation, "tableId" | "user">;
  totalPriceOrder: number;
  createdAt: string;
  updatedAt: string;
  finishedAt: string | null;
  orderItems: IOrderItem[];
}

export interface IUpdateOrderItemStatus {
  status: IOrderStatus;
}
