import { IReservation } from "@/entities/reservation";
import { Badge, Box, Spoiler, Table, Text } from "@mantine/core";

const ORDER_ITEM_STATUS_LABELS: Record<string, string> = {
  COOKING: "Готовится",
  READY: "Готово",
  SERVED: "Подано",
};

const ORDER_ITEM_STATUS_COLORS: Record<string, string> = {
  COOKING: "orange",
  READY: "teal",
  SERVED: "blue",
};

export default function OrdersTableSection({
  reservation,
}: {
  reservation: IReservation;
}) {
  const orders = reservation.order ?? [];

  if (orders.length === 0) {
    return null;
  }

  return (
    <Box w="100%">
      <Spoiler
        maxHeight={0}
        showLabel="Показать заказы"
        hideLabel="Скрыть заказы"
      >
        <Table.ScrollContainer minWidth={500} maxHeight={400} type="native">
          <Table withTableBorder striped highlightOnHover mt="sm" fz="xs">
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
              {orders.flatMap((order) =>
                order.orderItems.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{item.dish?.name ?? "—"}</Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>{item.priceSnapshot}&nbsp;₽</Table.Td>
                    <Table.Td>
                      <Badge
                        color={ORDER_ITEM_STATUS_COLORS[item.status] ?? "gray"}
                        variant="light"
                        size="xs"
                      >
                        {ORDER_ITEM_STATUS_LABELS[item.status] ?? item.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="12px" c="dimmed">
                        {item.comment ?? "—"}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )),
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Spoiler>
    </Box>
  );
}
