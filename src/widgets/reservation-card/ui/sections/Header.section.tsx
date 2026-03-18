import {
  IReservation,
  ReservationStatusTranslate,
} from "@/entities/reservation";
import { Group, ThemeIcon, Title, Badge, Text } from "@mantine/core";
import { IconTable } from "@tabler/icons-react";

export default function HeaderSection({
  reservation,
}: {
  reservation: IReservation;
}) {
  return (
    <Group justify="space-between" align="flex-start">
      <Group align="flex-start">
        <ThemeIcon size={48} radius="md" variant="light">
          <IconTable size={22} />
        </ThemeIcon>

        <div>
          <Title order={4}>Стол {reservation.tableNumber}</Title>
          <Text size="sm" c="dimmed">
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
  );
}
