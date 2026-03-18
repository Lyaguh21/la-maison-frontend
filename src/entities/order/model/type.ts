import { IDish } from "@/entities/dish";
import { IReservation } from "@/entities/reservation";
import { IUserState } from "@/entities/user";

type IOrderStatus = "COOKING" | "READY" | "SERVED";

export interface IOrder {
  id: number;
  reservationId: number;
  totalPriceOrder: number;
  createdAt: string;
  updatedAt: string;
  finishedAt: string | null;
  orderItems: IOrderItem[];
}

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
  reservation: {
    tableId: Pick<IReservation, "tableId">;
    user: Pick<IUserState, "userAllergens">;
  };
  totalPriceOrder: number;
  createdAt: string;
  updatedAt: string;
  finishedAt: string | null;
  orderItems: IOrderItem[];
}

export interface IUpdateOrderItemStatus {
  status: IOrderStatus;
}

export interface ICreateOrder {
  reservationId: number;
  orderItems: { dishId: number; quantity: number; comment?: string }[];
}
