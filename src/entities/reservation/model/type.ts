export type IReservationStatus =
  | "BOOKED"
  | "SEATED"
  | "CANCELLED"
  | "COMPLETED"
  | "PAID"
  | "NO_SHOW";

export const ReservationStatusTranslate = {
  BOOKED: "Забронировано",
  SEATED: "В зале",
  CANCELLED: "Отменено",
  COMPLETED: "Завершено",
  PAID: "Оплачено",
  NO_SHOW: "Не явился",
};

export interface IReservation {
  id: number;
  tableId: number;
  tableNumber?: number;
  userId: number;
  guestName: string | null;
  guestPhone: string | null;
  guestsCount: number;
  status: IReservationStatus;
  startTime: string;
  endTime: string;
  realStartTime: string | null;
  realEndTime: string | null;
  waiterId: number | null;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
}

export interface IReservationRangeQuery {
  day: string;
  startTime: string;
  endTime: string;
}

export interface ICreateReservationRequest {
  userId?: number;
  guestName?: string;
  guestPhone?: string;
  tableId: number;
  startTime: string;
  endTime: string;
  guestsCount: number;
}

export interface IUpdateStatusReservationQuery {
  id: number;
  status: IReservationStatus;
}
