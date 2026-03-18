import {
  IOrderCookingResponse,
  IOrderItem,
  useUpdateOrderItemStatusMutation,
} from "@/entities/order";
import { setOpenDishInfoModal, setSelectedDish } from "@/entities/view";
import { useAppDispatch, useNotifications } from "@/shared/lib";
import { IngredientBadge } from "@/shared/ui";
import {
  ActionIcon,
  Blockquote,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCheck,
  IconInfoCircle,
  IconInfoTriangle,
} from "@tabler/icons-react";

function OrderItem({ item }: { item: IOrderItem }) {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { showError, showSuccess } = useNotifications();
  const [updateOrderItemStatus] = useUpdateOrderItemStatusMutation();

  const handleOpenDishInfoModal = () => {
    dispatch(setOpenDishInfoModal(true));
    dispatch(setSelectedDish(item.dish));
  };

  const handleStatusChange = () => {
    try {
      updateOrderItemStatus({ id: item.id, status: "READY" });
      showSuccess("Статус блюда обновлен");
    } catch (e) {
      showError("Ошибка при обновлении статуса блюда");
    }
  };

  return (
    <>
      <Flex justify="space-between" align="center" wrap={"nowrap"}>
        <Group maw="80%" align="center" gap={4} style={{ flexWrap: "nowrap" }}>
          <ActionIcon variant="transparent" onClick={handleOpenDishInfoModal}>
            <IconInfoCircle />
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

        <Group align="center" gap={4} style={{ flexWrap: "nowrap" }}>
          <Text w={15} fw={600}>
            {item.quantity}
          </Text>
          {item.status === "COOKING" && (
            <ActionIcon
              size="sm"
              color={theme.colors.green[6]}
              onClick={handleStatusChange}
            >
              <IconCheck />
            </ActionIcon>
          )}
        </Group>
      </Flex>
      {item.comment && (
        <>
          <Blockquote p="sm">{item.comment}</Blockquote>
          <Divider />
        </>
      )}
    </>
  );
}

export default function OrderCard({ data }: { data: IOrderCookingResponse }) {
  const theme = useMantineTheme();
  const cookingTime = Math.floor(
    (new Date().getTime() - new Date(data.createdAt).getTime()) / 1000 / 60,
  );
  const archiveCookingTime = Math.floor(
    (new Date(data.finishedAt ?? new Date()).getTime() -
      new Date(data.createdAt).getTime()) /
      1000 /
      60,
  );

  return (
    <Paper withBorder shadow="md" p="lg" radius="md">
      <Text
        fw={600}
        fz={48}
        ta="center"
        c={
          !data.finishedAt
            ? cookingTime < 15
              ? theme.colors.green[6]
              : cookingTime < 25
                ? theme.colors.yellow[6]
                : theme.colors.red[6]
            : theme.primaryColor
        }
      >
        {data.finishedAt ? archiveCookingTime : cookingTime}
        <Text ml={4} span fz="lg" c="dimmed" fw={600}>
          мин
        </Text>
      </Text>

      <Group align="end" justify="space-between">
        <Text fz="lg" fw={600}>
          Заказ №{data.id}. Стол №{data.reservation.tableId}
        </Text>

        <Text fz="sm" c="dimmed" fw={600}>
          {new Date(data.createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {data.finishedAt &&
            ` - ${new Date(data.finishedAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
        </Text>
      </Group>
      {data.reservation?.user && (
        <>
          <Divider my="sm" />
          <Group align="center" gap={4} mt="sm">
            <IconInfoTriangle size={32} color={theme.colors.burgundy[6]} />
            {data.reservation.user.userAllergens?.map((allergen) => (
              <IngredientBadge ingredient={allergen} key={allergen.id} />
            ))}
          </Group>
        </>
      )}
      <Divider my="sm" />
      <Stack gap="sm">
        {data.orderItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </Stack>
    </Paper>
  );
}
