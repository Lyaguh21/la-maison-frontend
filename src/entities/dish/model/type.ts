export interface Ingredient {
  id: number;
  name: string;
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  price: string;
  photo?: string | null;
  dishIngredients?: Ingredient[];
  createdAt?: Date;
  updatedAt?: Date;
}
