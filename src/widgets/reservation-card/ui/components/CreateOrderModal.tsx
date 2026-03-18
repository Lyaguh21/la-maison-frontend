import { useMenuQuery } from "@/entities/menu";
import { useCreateOrderMutation } from "@/entities/order";
import { IReservation } from "@/entities/reservation";
import { useNotifications } from "@/shared/lib";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Input,
  Modal,
  NumberInput,
  Paper,
  Stack,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useRef, useState } from "react";

type DraftOrderItem = {
  dishId: number;
  dishName: string;
  price: number;
  quantity: number;
  comment: string;
};

export default function CreateOrderModal({
  stack,
  reservation,
}: {
  stack: any;
  reservation: IReservation;
}) {
  const { showError, showSuccess } = useNotifications();
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<{
    id: number;
    name: string;
    price: number;
  } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [orderItems, setOrderItems] = useState<DraftOrderItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { data: menu } = useMenuQuery({ page: 1, limit: 10, search });
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const canShowDropdown = isFocused && search.trim().length > 0;

  const handleSelectDish = (dish: {
    id: number;
    name: string;
    price: string;
  }) => {
    setSelectedDish({
      id: dish.id,
      name: dish.name,
      price: Number(dish.price),
    });
    setSearch(dish.name);
    setIsFocused(false);
    setQuantity(1);
  };

  const handleAddDishToOrder = () => {
    if (!selectedDish) {
      showError("Сначала выберите блюдо из поиска");
      return;
    }

    setOrderItems((prev) => [
      ...prev,
      {
        dishId: selectedDish.id,
        dishName: selectedDish.name,
        price: selectedDish.price,
        quantity: Math.max(1, quantity),
        comment: comment.trim(),
      },
    ]);

    setSelectedDish(null);
    setSearch("");
    setQuantity(1);
    setComment("");
    inputRef.current?.focus();
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCreateOrder = async () => {
    if (orderItems.length === 0) {
      showError("Добавьте хотя бы одно блюдо в заказ");
      return;
    }

    try {
      await createOrder({
        reservationId: reservation.id,
        orderItems: orderItems.map((item) => ({
          dishId: item.dishId,
          quantity: item.quantity,
          ...(item.comment ? { comment: item.comment } : {}),
        })),
      }).unwrap();

      showSuccess("Заказ создан");
      setOrderItems([]);
      setSelectedDish(null);
      setSearch("");
      setQuantity(1);
      setComment("");
      stack.closeAll();
    } catch {
      showError("Ошибка при создании заказа");
    }
  };

  return (
    <Modal size="auto" {...stack.register("add-order")} title="Добавить заказ">
      <Stack>
        <Box pos="relative">
          <Input
            ref={inputRef}
            placeholder="Поиск..."
            __clearable
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 120);
            }}
          />

          {canShowDropdown && (
            <Paper
              withBorder
              pos="absolute"
              top="calc(100% + 4px)"
              left={0}
              right={0}
              py="sm"
              style={{ zIndex: 20 }}
            >
              <Stack gap="sm">
                {menu?.data.length === 0 && (
                  <Text px="md" fz="md" c="dimmed">
                    Ничего не найдено
                  </Text>
                )}
                {menu?.data.map((dish) => (
                  <Group
                    justify="space-between"
                    align="center"
                    key={dish.id}
                    px="md"
                  >
                    <Stack gap={0}>
                      <Text fz="sm" fw={600}>
                        {dish.name}
                      </Text>
                      <Text fz="xs" c="dimmed">
                        {dish.price} ₽
                      </Text>
                    </Stack>
                    <ActionIcon
                      variant="light"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectDish(dish);
                      }}
                    >
                      <IconPlus size={16} />
                    </ActionIcon>
                  </Group>
                ))}
              </Stack>
            </Paper>
          )}
        </Box>

        <Group grow align="end">
          <NumberInput
            label="Количество"
            min={1}
            value={quantity}
            onChange={(value) =>
              setQuantity(typeof value === "number" && value > 0 ? value : 1)
            }
          />
          <TextInput
            label="Комментарий"
            placeholder="Например: без лука"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleAddDishToOrder}
          >
            Добавить
          </Button>
        </Group>

        <Stack gap="xs">
          <Text fw={600}>Состав заказа</Text>
          <Table.ScrollContainer minWidth={720} type="native">
            <Table withTableBorder striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Блюдо</Table.Th>
                  <Table.Th>Кол-во</Table.Th>
                  <Table.Th>Цена</Table.Th>
                  <Table.Th>Комментарий</Table.Th>
                  <Table.Th>Сумма</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {orderItems.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Text c="dimmed" ta="center">
                        Заказ пока пуст
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  orderItems.map((item, index) => (
                    <Table.Tr key={`${item.dishId}-${index}`}>
                      <Table.Td>{item.dishName}</Table.Td>
                      <Table.Td>{item.quantity}</Table.Td>
                      <Table.Td>{item.price} ₽</Table.Td>
                      <Table.Td>{item.comment || "—"}</Table.Td>
                      <Table.Td>{item.price * item.quantity} ₽</Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Stack>

        <Group justify="space-between" align="center">
          <Text fw={600}>Итого: {totalPrice} ₽</Text>
          <Button
            onClick={handleCreateOrder}
            loading={isLoading}
            disabled={orderItems.length === 0}
          >
            Создать
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
