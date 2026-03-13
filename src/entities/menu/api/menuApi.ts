import { baseApi } from "@/shared/api";
import {
  IDishesListResponse,
  IMenuCategory,
  IMenuQueryParams,
} from "../model/type";
import { Ingredient } from "@/entities/dish";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    menuCategories: build.query<IMenuCategory[], void>({
      query: () => "/menu/categories",
      providesTags: [{ type: "MenuCategory" }],
    }),

    ingredients: build.query<Ingredient[], void>({
      query: () => "/menu/ingredients",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              { type: "Ingredients" as const, id: "LIST" },
              ...result?.map((ingredient) => ({
                type: "Ingredients" as const,
                id: ingredient.id,
              })),
            ]
          : [{ type: "Ingredients" as const, id: "LIST" }],
    }),

    menu: build.query<IDishesListResponse, IMenuQueryParams>({
      query: (params) => ({
        url: "/menu/dishes",
        params,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              { type: "Menu" as const, id: "LIST" },
              ...result.map((post) => ({
                type: "Menu" as const,
                id: post.id,
              })),
            ]
          : [{ type: "Menu" as const, id: "LIST" }],
    }),
  }),
});

export const { useMenuCategoriesQuery, useMenuQuery, useIngredientsQuery } =
  authApi;
