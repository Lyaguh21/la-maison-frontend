import { IDish } from "@/entities/dish";

export interface IMenuQueryParams {
  search?: string;
  sort?: string;
  categoryId?: number;
  page?: number;
  limit?: number;
}

export interface IMenuCategory {
  id: number;
  name: string;
}

export interface IDishesListResponse {
  data: IDish[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
