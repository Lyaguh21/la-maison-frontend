import { IUserState } from "@/entities/user";

export interface IReservation {
  tableId: number;
  user?: Pick<IUserState, "userAllergens">;
  //? Временно
}
