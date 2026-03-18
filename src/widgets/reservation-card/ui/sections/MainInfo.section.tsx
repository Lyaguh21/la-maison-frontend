import { IReservation } from "@/entities/reservation";
import { Stack, Group, ThemeIcon, Text } from "@mantine/core";
import {
  IconClock,
  IconUser,
  IconPhone,
  IconUsers,
  IconCalendarWeek,
} from "@tabler/icons-react";

const fmt = (d?: string | null) =>
  d
    ? new Date(d).toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

export default function MainInfoSection({
  reservation,
}: {
  reservation: IReservation;
}) {
  return (
    <Stack gap="md">
      <Group gap="md">
        <Group gap="xs">
          <ThemeIcon radius="xl" size="lg" variant="light">
            <IconCalendarWeek size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">
              Дата
            </Text>
            <Text size="sm">
              {new Date(reservation.startTime).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
              })}
            </Text>
          </div>
        </Group>
        <Group gap="xs">
          <ThemeIcon radius="xl" size="lg" variant="light">
            <IconClock size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" c="dimmed">
              Запланированное время
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
              {fmt(reservation.realStartTime)} • {fmt(reservation.realEndTime)}
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
            <IconUsers size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">
              Кол-во гостей
            </Text>
            <Text size="sm">{reservation.guestsCount ?? "—"}</Text>
          </div>
        </Group>

        <Group gap="xs">
          <ThemeIcon radius="xl" size="lg" variant="light">
            <IconUser size={16} />
          </ThemeIcon>
          <div>
            <Text size="xs" color="dimmed">
              Номер официанта
            </Text>
            <Text size="sm">{reservation.waiterId ?? "—"}</Text>
          </div>
        </Group>
      </Group>
    </Stack>
  );
}
