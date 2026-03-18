import { PlacedFloorItem } from "@/entities/floor-items";
import {
  useCreateReservationMutation,
  useGetReservationsOnDayByTableQuery,
} from "@/entities/reservation";
import { TableSeats } from "@/entities/table";
import { selectUser } from "@/entities/user/model/userSelectors";
import {
  selectOpenedReservationPanel,
  setOpenReservationPanel,
} from "@/entities/view";
import { localToUtcIso } from "@/shared/helpers";
import { useAppDispatch, useAppSelector, useNotifications } from "@/shared/lib";
import {
  Paper,
  useMantineTheme,
  Text,
  Stack,
  Title,
  Group,
  Badge,
  NumberInput,
  Button,
  Divider,
  ScrollArea,
  Center,
} from "@mantine/core";
import { useClickOutside, useMediaQuery } from "@mantine/hooks";

import {
  IconCalendarWeek,
  IconClockHour1,
  IconClockHour2,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

export default function ReservationPanel({
  selectedItem,
  startReservationTime,
  endReservationTime,
  dateReservation,
}: {
  dateReservation: string | null;
  startReservationTime: string | null;
  endReservationTime: string | null;
  selectedItem: PlacedFloorItem | null;
}) {
  const dispatch = useAppDispatch();
  const isSmall = useMediaQuery("(max-width: 1024px)");
  const opened = useAppSelector(selectOpenedReservationPanel);
  const ref = useClickOutside(() => dispatch(setOpenReservationPanel(false)));

  const { showError, showSuccess } = useNotifications();
  const theme = useMantineTheme();

  const user = useAppSelector(selectUser);
  const { data: reservationOnTable } = useGetReservationsOnDayByTableQuery({
    day: dateReservation!,
    tableId: selectedItem?.tableId!,
  });
  const [createReservation] = useCreateReservationMutation();
  const [guestsCount, setGuestsCount] = useState<string | number>("2");

  const handleCreateReservation = async () => {
    try {
      await createReservation({
        userId: user?.id,
        tableId: selectedItem?.tableId!,
        startTime: localToUtcIso(dateReservation!, startReservationTime!),
        endTime: localToUtcIso(dateReservation!, endReservationTime!),
        guestName: user?.name,
        guestPhone: user?.phone,
        guestsCount: Number(guestsCount),
      }).unwrap();
      showSuccess("Бронирование успешно создано!");
    } catch (e: any) {
      showError(e.data.details.message || "Не удалось создать бронирование");
    }
  };

  if (!opened && isSmall) return null;
  return (
    <Paper
      ref={ref}
      radius={0}
      p="md"
      w={300}
      h="100dvh"
      pos="fixed"
      right={0}
      style={{
        borderLeft: "1px solid",
        borderColor: theme.colors.gray[3],
        zIndex: 100,
      }}
    >
      {selectedItem?.type !== "TABLE" && (
        <Center h="100%">
          <Text fz="sm" ta="center">
            Выберите стол для бронирования
          </Text>
        </Center>
      )}

      {selectedItem?.type === "TABLE" && (
        <Stack gap="md">
          <Title fz="xl" ta="center">
            Информация о столе
          </Title>
          <Group gap="2">
            <Badge size="md">Стол №{selectedItem.number}</Badge>
            <Badge size="md" variant="transparent" c={theme.colors.dark[2]}>
              <Group gap={4}>
                <IconUsers size={16} /> мест:{" "}
                {TableSeats[selectedItem.tableType as keyof typeof TableSeats]}
              </Group>
            </Badge>
          </Group>
          <Divider label="Брони на этот стол" />

          <ScrollArea mah={400}>
            <Stack gap="xs">
              {reservationOnTable?.length === 0 && (
                <Text ta="center" c={theme.primaryColor} fw={500}>
                  Бронирований нет
                </Text>
              )}
              {reservationOnTable?.map((reservation) => (
                <Paper key={reservation.id} p="sm" withBorder>
                  <Text fz="sm">
                    {new Date(reservation.startTime).toLocaleTimeString(
                      "ru-RU",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}{" "}
                    -{" "}
                    {new Date(reservation.endTime).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>

          <Divider label="Бронирование" />

          <NumberInput
            label="Количество гостей"
            placeholder="Выберите количество гостей"
            min={1}
            max={8}
            value={guestsCount}
            onChange={setGuestsCount}
          />

          <Group gap={4}>
            <IconCalendarWeek color={theme.colors.dark[3]} />
            <Text fw={500} c={theme.colors.dark[3]}>
              Дата брони:{" "}
              <Text span c={theme.primaryColor} fw={700}>
                {new Date(dateReservation!).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                })}
              </Text>
            </Text>
          </Group>
          <Group gap={4}>
            <IconClockHour1 color={theme.colors.dark[3]} />
            <Text fw={500} c={theme.colors.dark[3]}>
              Время начала:{" "}
              <Text span c={theme.primaryColor} fw={700}>
                {startReservationTime?.substring(0, 5)}
              </Text>
            </Text>
          </Group>
          <Group gap={4}>
            <IconClockHour2 color={theme.colors.dark[3]} />
            <Text fw={500} c={theme.colors.dark[3]}>
              Время конца:{" "}
              <Text span c={theme.primaryColor} fw={700}>
                {endReservationTime?.substring(0, 5)}
              </Text>
            </Text>
          </Group>
          <Button onClick={handleCreateReservation}>Забронировать</Button>
        </Stack>
      )}
    </Paper>
  );
}
