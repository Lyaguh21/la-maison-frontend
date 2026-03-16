type IReservationStatus =
  | "BOOKED"
  | "SEATED"
  | "CANCELLED"
  | "COMPLETED"
  | "PAID"
  | "NO_SHOW";

export interface IReservation {
  id: number;
  tableId: number;
  userId: number;
  guestName: string | null;
  guestPhone: string | null;
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
