import {
  IOrderCookingResponse,
  IOrderItem,
  useOrderReadyQuery,
  useUpdateOrderItemStatusMutation,
} from "@/entities/order";
import { setOpenDishInfoModal, setSelectedDish } from "@/entities/view";
import { DishInfoModal } from "@/widgets/dish-info-modal";
import { useAppDispatch, useNotifications } from "@/shared/lib";
import {
  ActionIcon,
  Divider,
  Flex,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";

function ReadyItem({ item }: { item: IOrderItem }) {
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotifications();
  const [updateOrderItemStatus] = useUpdateOrderItemStatusMutation();

  const handleOpenDishInfoModal = () => {
    dispatch(setOpenDishInfoModal(true));
    dispatch(setSelectedDish(item.dish));
  };

  const handleMarkServed = async () => {
    try {
      await updateOrderItemStatus({ id: item.id, status: "SERVED" }).unwrap();
      showSuccess("Блюдо отмечено как поданное");
    } catch {
      showError("Ошибка при обновлении статуса блюда");
    }
  };

  return (
    <Flex justify="space-between" align="center" wrap="nowrap">
      <Group maw="75%" align="center" gap={4} style={{ flexWrap: "nowrap" }}>
        <ActionIcon variant="subtle" onClick={handleOpenDishInfoModal}>
          <IconInfoCircle size={22} />
        </ActionIcon>
        <Tooltip label={item.dish.name}>
          <Text
            fz="sm"
            fw={500}
            style={{
              textWrap: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.dish.name}
          </Text>
        </Tooltip>
      </Group>

      <Group gap={6} style={{ flexWrap: "nowrap" }}>
        <Text fz="sm" fw={600}>
          x{item.quantity}
        </Text>
        <ActionIcon color="green" size="sm" onClick={handleMarkServed}>
          <IconCheck size={14} />
        </ActionIcon>
      </Group>
    </Flex>
  );
}

function ReadyOrderCard({ order }: { order: IOrderCookingResponse }) {
  return (
    <Paper withBorder shadow="sm" p="lg" radius="md">
      <Group justify="space-between" align="end">
        <Text fw={700} fz="lg">
          Заказ №{order.id}
        </Text>
        <Text c="dimmed" fz="sm">
          Стол №{order.reservation?.table?.number}
        </Text>
      </Group>

      <Text c="dimmed" fz="xs" mt={4}>
        {new Date(order.createdAt).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>

      <Divider my="sm" />

      <Stack gap="xs">
        {order.orderItems.map((item) => (
          <ReadyItem item={item} key={item.id} />
        ))}
      </Stack>
    </Paper>
  );
}

export default function ReadyDish() {
  const { data: readyOrders, isLoading } = useOrderReadyQuery();

  return (
    <>
      <DishInfoModal />

      <Stack gap="md" p="xl" h="100vh">
        <Title>Готовые блюда</Title>

        <ScrollArea flex={1}>
          {isLoading ? (
            <Text c="dimmed">Загрузка...</Text>
          ) : readyOrders && readyOrders.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
              {readyOrders.map((order) => (
                <ReadyOrderCard key={order.id} order={order} />
              ))}
            </SimpleGrid>
          ) : (
            <Text c="dimmed">Сейчас нет готовых блюд</Text>
          )}
        </ScrollArea>
      </Stack>
    </>
  );
}
