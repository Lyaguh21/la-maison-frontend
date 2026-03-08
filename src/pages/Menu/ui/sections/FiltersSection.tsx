import { useMenuCategoriesQuery } from "@/entities/menu";
import { Fieldset, Stack, Select, Input, Box } from "@mantine/core";
import { useThrottledCallback } from "@mantine/hooks";
import { useState, useEffect } from "react";
import {
  IconFilter,
  IconLayoutGrid,
  IconLayoutList,
  IconSearch,
  IconSortAscending2,
  IconSortDescending2,
  IconListDetails,
} from "@tabler/icons-react";

import { useSearchParams } from "react-router-dom";
import { updateParams } from "../../helpers/UpdateParams";

const sortData = [
  { value: "asc", label: "Возрастанию" },
  { value: "desc", label: "Убыванию" },
];

const limitData = [
  { value: "5", label: "5" },
  { value: "12", label: "12" },
  { value: "24", label: "24" },
];

const visibleData = [
  {
    value: "grid",
    label: "Сетка",
  },
  { value: "list", label: "Список" },
];

export default function FiltersSection() {
  const { data: categories } = useMenuCategoriesQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "asc";
  const categoryId = searchParams.get("categoryId");
  const visible = searchParams.get("visible") || "grid";
  const limit = searchParams.get("limit") || "12";

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== searchInput) {
      setSearchInput(urlSearch);
    }
  }, [searchParams]);

  const throttledSetValue = useThrottledCallback((value: string) => {
    updateParams("search", value, searchParams, setSearchParams);
  }, 500);

  return (
    <Fieldset miw={"300px"}>
      <Stack gap="md" align="center">
        <Input.Wrapper w="100%">
          <Input.Label>Поиск</Input.Label>
          <Input
            value={searchInput}
            leftSection={<IconSearch />}
            placeholder="Поиск по меню..."
            onChange={(e) => {
              setSearchInput(e.target.value);
              throttledSetValue(e.target.value);
            }}
          />
        </Input.Wrapper>

        <Select
          w="100%"
          leftSection={<IconFilter />}
          label="Фильтр по категории"
          placeholder="Все"
          clearable
          data={categories?.map((category) => ({
            value: String(category.id),
            label: category.name,
          }))}
          value={String(categoryId)}
          onChange={(value) =>
            updateParams("categoryId", value, searchParams, setSearchParams)
          }
        />

        <Select
          w="100%"
          leftSection={
            sort === "asc" ? <IconSortAscending2 /> : <IconSortDescending2 />
          }
          label="Сортировать по"
          placeholder="Убыванию"
          data={sortData}
          defaultValue={"asc"}
          value={sort}
          onChange={(value) =>
            updateParams("sort", value, searchParams, setSearchParams)
          }
        />
        <Box h={0.5} w="80%" bg="gray.3" />
        <Select
          w="100%"
          leftSection={<IconListDetails />}
          label="Количество карточек на странице"
          placeholder="Кол-во карточек"
          data={limitData}
          defaultValue={"12"}
          value={limit}
          onChange={(value) =>
            updateParams("limit", value, searchParams, setSearchParams)
          }
        />
        <Select
          w="100%"
          leftSection={
            visible === "list" ? <IconLayoutList /> : <IconLayoutGrid />
          }
          label="Режим отображения"
          placeholder="Как будут выглядеть карточки блюд"
          data={visibleData}
          defaultValue={"grid"}
          value={visible}
          onChange={(value) =>
            updateParams("visible", value, searchParams, setSearchParams)
          }
        />
      </Stack>
    </Fieldset>
  );
}
