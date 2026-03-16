import { IReservation } from "@/entities/reservation";
import {
  Paper,
  Group,
  Badge,
  Text,
  Stack,
  Button,
  Divider,
  ThemeIcon,
} from "@mantine/core";
import { IconUser, IconPhone, IconSofa } from "@tabler/icons-react";
import { useUpdateStatusReservationMutation } from "@/entities/reservation";
import { useNotifications } from "@/shared/lib";

export default function FutureReservationCard({
  reservation,
}: {
  reservation: IReservation;
}) {
  const { showError, showSuccess } = useNotifications();
  const [updateStatus, { isLoading }] = useUpdateStatusReservationMutation();

  const handleUpdate = async (status: "SEATED" | "NO_SHOW") => {
    if (reservation.status === status) return;
    try {
      await updateStatus({ id: reservation.id, status }).unwrap();
      showSuccess("Статус бронирования обновлен");
    } catch (e: any) {
      showError(e.data.message || "Ошибка при обновлении статуса бронирования");
    }
  };

  return (
    <Paper
      mih={274.5}
      radius="md"
      withBorder
      shadow="sm"
      p="md"
      key={reservation.id}
    >
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Text fz="lg" fw={700}>
            {new Date(reservation.startTime).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(reservation.endTime).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Badge>{reservation.status}</Badge>
        </Group>

        <Stack gap="sm">
          <Group>
            <ThemeIcon size="lg" variant="light">
              <IconSofa size={18} />
            </ThemeIcon>
            <Text size="sm">Стол: {reservation.tableId}</Text>
          </Group>
          <Group>
            <ThemeIcon size="lg" variant="light">
              <IconUser size={18} />
            </ThemeIcon>
            <Text size="sm">{reservation.guestName ?? "Гость"}</Text>
          </Group>

          <Group>
            <ThemeIcon size="lg" variant="light">
              <IconPhone size={18} />
            </ThemeIcon>
            <Text size="sm">{reservation.guestPhone ?? "-"}</Text>
          </Group>
        </Stack>

        <Divider />

        <Group>
          <Button
            color="green"
            onClick={() => handleUpdate("SEATED")}
            loading={isLoading}
            disabled={reservation.status === "SEATED" || isLoading}
            size="sm"
          >
            Пришел
          </Button>
          <Button
            color="red"
            onClick={() => handleUpdate("NO_SHOW")}
            loading={isLoading}
            disabled={reservation.status === "NO_SHOW" || isLoading}
            size="sm"
          >
            Не пришёл
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
