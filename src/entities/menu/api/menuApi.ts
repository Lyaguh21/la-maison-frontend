import { baseApi } from "@/shared/api";
import { IDishCard, IMenuCategory } from "../model/type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    menuCategories: build.query<IMenuCategory[], void>({
      query: () => "/menu/categories",
      providesTags: [{ type: "MenuCategory" }],
    }),

    menu: build.query<IDishCard[], void>({
      query: () => "/menu/dishes",
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

export const { useMenuCategoriesQuery, useMenuQuery } = authApi;
