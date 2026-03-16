import { useState } from "react";
import {
  IReservation,
  useUpdateStatusReservationMutation,
  ReservationStatusTranslate,
} from "@/entities/reservation";
import {
  Paper,
  Group,
  Text,
  Badge,
  Stack,
  Divider,
  ThemeIcon,
  ActionIcon,
  Modal,
  Button,
  Title,
} from "@mantine/core";
import {
  IconSettings,
  IconTable,
  IconClock,
  IconUser,
  IconPhone,
  IconCash,
  IconPlus,
  IconCheck,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useNotifications } from "@/shared/lib";

export default function ReservationCard({
  reservation,
}: {
  reservation: IReservation;
}) {
  const { showError, showSuccess } = useNotifications();
  const [opened, { open, close }] = useDisclosure(false);
  const [updateStatus] = useUpdateStatusReservationMutation();
  const fmt = (d?: string | null) =>
    d
      ? new Date(d).toLocaleString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-";

  const handleChangeStatus = async () => {
    try {
      if (reservation.status === "SEATED") {
        await updateStatus({ id: reservation.id, status: "PAID" }).unwrap();
      } else if (reservation.status === "PAID") {
        await updateStatus({
          id: reservation.id,
          status: "COMPLETED",
        }).unwrap();
      }
      showSuccess("Статус бронирования обновлен");
    } catch (e) {
      showError("Ошибка при обновлении статуса бронирования");
    } finally {
      close();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Управление бронью">
        <Stack>
          <Button leftSection={<IconPlus size={16} />} variant="default">
            Добавить заказ
          </Button>
          <Button
            onClick={handleChangeStatus}
            leftSection={
              reservation.status === "SEATED" ? (
                <IconCash size={16} />
              ) : (
                <IconCheck size={16} />
              )
            }
            color="green"
          >
            {reservation.status === "SEATED"
              ? "Оплатить заказ"
              : "Завершить бронь"}
          </Button>
        </Stack>
      </Modal>

      <Paper radius="md" withBorder shadow="sm" p="md">
        <Group justify="space-between" align="flex-start">
          <Group align="flex-start">
            <ThemeIcon size={48} radius="md" variant="light">
              <IconTable size={22} />
            </ThemeIcon>

            <div>
              <Title order={4}>Стол {reservation.tableNumber}</Title>
              <Text size="sm" color="dimmed">
                Бронь #{reservation.id}
              </Text>
            </div>
          </Group>

          <Group>
            <Badge
              color={
                reservation.status === "SEATED"
                  ? "green"
                  : reservation.status === "PAID"
                    ? "teal"
                    : "blue"
              }
            >
              {ReservationStatusTranslate[reservation.status]}
            </Badge>
          </Group>
        </Group>

        <Divider my="md" />

        <Stack gap="md">
          <Group gap="md">
            <Group gap="xs">
              <ThemeIcon radius="xl" size="lg" variant="light">
                <IconClock size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">
                  Запланировано
                </Text>
                <Text size="sm">
                  {fmt(reservation.startTime)} — {fmt(reservation.endTime)}
                </Text>
              </div>
            </Group>

            <Group gap="xs">
              <ThemeIcon radius="xl" size="lg" variant="light">
                <IconClock size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">
                  Фактическое время
                </Text>
                <Text size="sm">
                  {fmt(reservation.realStartTime)} •{" "}
                  {fmt(reservation.realEndTime)}
                </Text>
              </div>
            </Group>
          </Group>
          <Group gap="md">
            <Group gap="xs">
              <ThemeIcon radius="xl" size="lg" variant="light">
                <IconUser size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">
                  Гость
                </Text>
                <Text size="sm">{reservation.guestName ?? "—"}</Text>
              </div>
            </Group>

            <Group gap="xs">
              <ThemeIcon radius="xl" size="lg" variant="light">
                <IconPhone size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">
                  Телефон
                </Text>
                <Text size="sm">{reservation.guestPhone ?? "—"}</Text>
              </div>
            </Group>
            <Group gap="xs">
              <ThemeIcon radius="xl" size="lg" variant="light">
                <IconPhone size={16} />
              </ThemeIcon>
              <div>
                <Text size="xs" color="dimmed">
                  Кол-во гостей
                </Text>
                <Text size="sm">{reservation.guestsCount ?? "—"}</Text>
              </div>
            </Group>

            <Group gap="xs"></Group>
          </Group>
          <Divider />
          <Group justify="space-between" align="center">
            <div>
              <Text size="xs" color="dimmed">
                Сумма заказа
              </Text>
              <Text size="sm">{reservation.totalPrice?.toFixed(2)} ₽</Text>
            </div>
            <ActionIcon
              size="lg"
              variant="light"
              onClick={open}
              title="Действия"
            >
              <IconSettings />
            </ActionIcon>
          </Group>
        </Stack>
      </Paper>
    </>
  );
}
