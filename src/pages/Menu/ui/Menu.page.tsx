import { Box, Flex, Text, Stack } from "@mantine/core";
import DishListSection from "./sections/DishListSection";
import FiltersSection from "./sections/FiltersSection";

export default function About() {
  return (
    <Box py={150}>
      <Stack gap="xl" align="center">
        <Text
          ff="'Playfair Display', serif"
          fw={400}
          fz={72}
          c="var(--mantine-color-text)"
          ta="center"
          style={{ letterSpacing: "8px", textTransform: "uppercase" }}
        >
          Наше меню
        </Text>
        <Box w={60} h={2} bg="gold.4" />

        <Flex direction={{ base: "column", lg: "row" }} w="80vw" gap="md">
          <FiltersSection />
          <DishListSection />
        </Flex>
      </Stack>
    </Box>
  );
}
