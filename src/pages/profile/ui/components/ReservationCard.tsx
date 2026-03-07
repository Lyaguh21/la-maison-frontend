import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Table,
  Collapse,
  UnstyledButton,
  Box,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

// ---------- Типы ----------

type StatusReservation =
  | "BOOKED"
  | "SEATED"
  | "CANCELLED"
  | "PAID"
  | "COMPLETED"
  | "NO_SHOW";

type StatusOrderItem = "COOKING" | "READY" | "SERVED";

interface OrderItem {
  id: number;
  dishName: string;
  quantity: number;
  priceSnapshot: number;
  comment?: string;
  status: StatusOrderItem;
}

interface Order {
  id: number;
  totalPriceOrder: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface Reservation {
  id: number;
  tableId: number;
  guestsCount: number;
  status: StatusReservation;
  startTime: string;
  endTime: string;
  realStartTime?: string;
  realEndTime?: string;
  createdAt: string;
  orders: Order[];
}

// ---------- Константы ----------

const STATUS_LABELS: Record<StatusReservation, string> = {
  BOOKED: "Забронировано",
  SEATED: "За столом",
  CANCELLED: "Отменено",
  PAID: "Оплачено",
  COMPLETED: "Завершено",
  NO_SHOW: "Не явился",
};

const STATUS_COLORS: Record<StatusReservation, string> = {
  BOOKED: "blue",
  SEATED: "teal",
  CANCELLED: "red",
  PAID: "green",
  COMPLETED: "gray",
  NO_SHOW: "orange",
};

const ORDER_ITEM_STATUS_LABELS: Record<StatusOrderItem, string> = {
  COOKING: "Готовится",
  READY: "Готово",
  SERVED: "Подано",
};

const ORDER_ITEM_STATUS_COLORS: Record<StatusOrderItem, string> = {
  COOKING: "yellow",
  READY: "green",
  SERVED: "gray",
};

// ---------- Компонент ----------

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  const [opened, setOpened] = useState(false);

  const totalSum = reservation.orders.reduce(
    (acc, o) => acc + o.totalPriceOrder,
    0,
  );

  return (
    <Card withBorder radius="md" p="lg" shadow="xs">
      <Group justify="space-between" mb="xs">
        <Group gap="sm">
          <Text fw={600} fz="md">
            Бронь #{reservation.id}
          </Text>
          <Badge
            color={STATUS_COLORS[reservation.status]}
            variant="light"
            size="sm"
          >
            {STATUS_LABELS[reservation.status]}
          </Badge>
        </Group>
        <Text fz="sm" c="dimmed">
          {formatDate(reservation.startTime)}
        </Text>
      </Group>

      <Group gap="xl" mb="sm">
        <Text fz="sm">
          <Text span fw={500}>
            Стол:
          </Text>{" "}
          №{reservation.tableId}
        </Text>
        <Text fz="sm">
          <Text span fw={500}>
            Гостей:
          </Text>{" "}
          {reservation.guestsCount}
        </Text>
        <Text fz="sm">
          <Text span fw={500}>
            Время:
          </Text>{" "}
          {new Date(reservation.startTime).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          —{" "}
          {new Date(reservation.endTime).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        {totalSum > 0 && (
          <Text fz="sm">
            <Text span fw={500}>
              Итого:
            </Text>{" "}
            {totalSum.toFixed(0)} ₽
          </Text>
        )}
      </Group>

      {reservation.orders.length > 0 && (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)}>
            <Group gap={4}>
              <Text fz="sm" fw={500} c="burgundy.6">
                {opened ? "Скрыть заказы" : "Показать заказы"} (
                {reservation.orders.length})
              </Text>
              {opened ? (
                <IconChevronUp
                  size={16}
                  color="var(--mantine-color-burgundy-6)"
                />
              ) : (
                <IconChevronDown
                  size={16}
                  color="var(--mantine-color-burgundy-6)"
                />
              )}
            </Group>
          </UnstyledButton>

          <Collapse in={opened}>
            <Stack gap="md" mt="sm">
              {reservation.orders.map((order) => (
                <Box key={order.id}>
                  <Group gap="sm" mb={4}>
                    <Text fz="sm" fw={600}>
                      Заказ #{order.id}
                    </Text>
                    <Text fz="xs" c="dimmed">
                      {formatDate(order.createdAt)}
                    </Text>
                    <Badge variant="light" size="xs" color="dark">
                      {order.totalPriceOrder.toFixed(0)} ₽
                    </Badge>
                  </Group>
                  <Table striped highlightOnHover withTableBorder fz="sm">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Блюдо</Table.Th>
                        <Table.Th>Кол-во</Table.Th>
                        <Table.Th>Цена</Table.Th>
                        <Table.Th>Статус</Table.Th>
                        <Table.Th>Комментарий</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {order.orderItems.map((item) => (
                        <Table.Tr key={item.id}>
                          <Table.Td>{item.dishName}</Table.Td>
                          <Table.Td>{item.quantity}</Table.Td>
                          <Table.Td>{item.priceSnapshot} ₽</Table.Td>
                          <Table.Td>
                            <Badge
                              color={ORDER_ITEM_STATUS_COLORS[item.status]}
                              variant="light"
                              size="xs"
                            >
                              {ORDER_ITEM_STATUS_LABELS[item.status]}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text fz="xs" c="dimmed">
                              {item.comment || "—"}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Box>
              ))}
            </Stack>
          </Collapse>
        </>
      )}
    </Card>
  );
}
