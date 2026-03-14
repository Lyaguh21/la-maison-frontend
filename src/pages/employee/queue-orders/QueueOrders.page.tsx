import {
  IOrderCookingResponse,
  useOrderArchiveQuery,
  useOrderCookingQuery,
} from "@/entities/order";
import {
  ActionIcon,
  Flex,
  ScrollArea,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import OrderCard from "./components/OrderCard";
import { DishInfoModal } from "@/widgets/dish-info-modal";
import { IconArchive, IconListCheck } from "@tabler/icons-react";
import { useToggle } from "@mantine/hooks";

export default function QueueOrders() {
  const [value, toggle] = useToggle(["orders", "archive"]);
  const { data: orders } = useOrderCookingQuery();
  const { data: archiveOrders } = useOrderArchiveQuery();

  return (
    <>
      <DishInfoModal />

      <Stack gap="md" p="xl" h="100vh">
        <Flex justify="space-between" align="center">
          <Title>Очередь заказов</Title>
          <ActionIcon size="lg" onClick={() => toggle()}>
            {value === "orders" ? <IconArchive /> : <IconListCheck />}
          </ActionIcon>
        </Flex>
        <ScrollArea flex={1}>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {value === "orders"
              ? orders?.map((el: IOrderCookingResponse) => (
                  <OrderCard data={el} />
                ))
              : archiveOrders?.map((el: IOrderCookingResponse) => (
                  <OrderCard data={el} />
                ))}
          </SimpleGrid>
        </ScrollArea>
      </Stack>
    </>
  );
}
