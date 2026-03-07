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

export interface Ingredient {
  id: number;
  name: string;
}

export interface IDishCard {
  id: number;
  name: string;
  description: string;
  price: string;
  photo: string;
  dishIngredients?: Ingredient[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDishesListResponse {
  data: IDishCard[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
