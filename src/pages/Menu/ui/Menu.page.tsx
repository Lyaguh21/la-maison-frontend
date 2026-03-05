import { useMenuQuery } from "@/entities/menu";
import { DishCard } from "@/widgets/dish-card";
import {
  Box,
  Fieldset,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconSearch, IconSortAscendingSmallBig } from "@tabler/icons-react";

export default function About() {
  const { data, isLoading, isFetching } = useMenuQuery();

  return (
    <Box py={150}>
      <Stack gap="xl" align="center">
        <Text
          ff="'Playfair Display', serif"
          fw={400}
          fz={72}
          c="black"
          ta="center"
          style={{ letterSpacing: "8px", textTransform: "uppercase" }}
        >
          Наше меню
        </Text>
        <Box w={60} h={2} bg="gold.4" />

        <Flex direction={{ base: "column", lg: "row" }} w="80vw" gap={16}>
          <Fieldset miw={"300px"}>
            <Stack gap="md">
              <Input.Wrapper>
                <Input.Label>Поиск</Input.Label>
                <Input
                  leftSection={<IconSearch />}
                  placeholder="Поиск по меню..."
                />
              </Input.Wrapper>

              <Select label="Категория" placeholder="Все" />

              <Select
                leftSection={<IconSortAscendingSmallBig />}
                label="Сортировать по"
                placeholder="Убыванию"
              />
            </Stack>
          </Fieldset>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 3, xxl: 4 }}>
            {data?.map((el) => (
              <DishCard key={el.id} dish={el} />
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </Box>
  );
}
