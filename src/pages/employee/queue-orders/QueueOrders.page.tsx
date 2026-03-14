import { IOrderCookingResponse, useOrderCookingQuery } from "@/entities/order";
import { ScrollArea, SimpleGrid, Stack, Title } from "@mantine/core";
import OrderCard from "./components/OrderCard";
import { DishInfoModal } from "@/widgets/dish-info-modal";

export default function QueueOrders() {
  const { data: orders } = useOrderCookingQuery();

  return (
    <>
      <DishInfoModal />

      <Stack gap="md" p="xl" h="100vh">
        <Title>Очередь заказов</Title>
        <ScrollArea flex={1}>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {orders?.map((el: IOrderCookingResponse) => (
              <OrderCard data={el} />
            ))}
          </SimpleGrid>
        </ScrollArea>
      </Stack>
    </>
  );
}
