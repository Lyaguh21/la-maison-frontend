import { useMenuQuery } from "@/entities/menu";
import { useMenuFilters } from "@/entities/menu/hooks/useMenuFilters";
import { DishCard } from "@/widgets/dish-card";
import {
  Box,
  Group,
  Pagination,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { updateParams } from "../../helpers/UpdateParams";

export default function DishListSection() {
  const theme = useMantineTheme();
  const params = useMenuFilters();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useMenuQuery(params);

  const visible = searchParams.get("visible") || "grid";
  return (
    <Stack flex={1}>
      <Group gap="md">
        <Paper withBorder p="sm" py={"xs"} radius="sm">
          <Text c={theme.colors.gray[6]}>
            Всего страниц:{" "}
            <Text fw={700} span c={theme.primaryColor}>
              {data?.meta.pages} шт.
            </Text>
          </Text>
        </Paper>
        <Paper withBorder p="sm" py={"xs"} radius="sm">
          <Text c={theme.colors.gray[6]}>
            Всего блюд:{" "}
            <Text fw={700} span c={theme.primaryColor}>
              {data?.meta.total} шт.
            </Text>
          </Text>
        </Paper>
      </Group>
      <SimpleGrid
        cols={visible === "grid" ? { base: 1, sm: 2, md: 3, lg: 3, xxl: 4 } : 1}
      >
        {isLoading
          ? [...Array(8).keys()].map((i) => (
              <Skeleton key={i} h="413px" w="100%" />
            ))
          : null}
        {data?.data.map((el) => (
          <DishCard key={el.id} dish={el} />
        ))}
        {data?.data.length === 0 && (
          <Box style={{ gridColumn: "1 / 4" }}>
            <Text
              ta="center"
              fz={32}
              pt={30}
              fw={500}
              ff="'Playfair Display', serif"
            >
              Ничего не найдено
            </Text>
          </Box>
        )}
      </SimpleGrid>
      <Pagination
        mx="auto"
        value={data?.meta.page}
        total={data?.meta.pages || 1}
        onChange={(value) =>
          updateParams("page", String(value), searchParams, setSearchParams)
        }
      />
    </Stack>
  );
}
