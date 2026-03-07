export type UserRole = "ADMIN" | "CUSTOMER" | "COOK" | "WAITER";

export interface Allergen {
  id: number;
  name: string;
}

export interface IUserState {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  userAllergens?: Allergen[];
}

export interface IUpdateProfileData extends Pick<
  IUserState,
  "email" | "name" | "phone"
> {
  userAllergenIds: number[];
}
