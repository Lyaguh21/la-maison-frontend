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
