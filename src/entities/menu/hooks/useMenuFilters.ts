import { useSearchParams } from "react-router-dom";
import type { IMenuQueryParams } from "@/entities/menu";

export function useMenuFilters(): IMenuQueryParams {
  const [searchParams] = useSearchParams();

  return {
    search: searchParams.get("search") || undefined,
    sort: searchParams.get("sort") || undefined,
    categoryId: searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
  };
}
