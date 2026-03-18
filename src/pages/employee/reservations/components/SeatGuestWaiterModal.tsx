import {
  useCreateReservationMutation,
  useUpdateStatusReservationMutation,
} from "@/entities/reservation";
import { TableSeats, useGetFreeTablesQuery } from "@/entities/table";
import { localToUtcIso } from "@/shared/helpers";
import { useNotifications } from "@/shared/lib";
import { TimePicker } from "@/shared/ui";
import {
  Badge,
  Button,
  Divider,
  Group,
  Modal,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useState } from "react";

export default function SeatGuestWaiterModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { showError, showSuccess } = useNotifications();

  const [startReservationTime, setStartReservationTime] = useState<
    string | null
  >(new Date().toLocaleTimeString("ru-RU").substring(0, 5));
  const [endReservationTime, setEndReservationTime] = useState<string | null>(
    () => {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 90);
      return now.toLocaleTimeString("ru-RU").substring(0, 5);
    },
  );
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [guestsCount, setGuestsCount] = useState<string | undefined | number>(
    undefined,
  );

  const { data: freeTables } = useGetFreeTablesQuery({
    startTime: startReservationTime?.substring(0, 5) ?? "10:00",
    endTime: endReservationTime?.substring(0, 5) ?? "11:30",
  });
  const [createReservation] = useCreateReservationMutation();
  const [updateStatusReservation] = useUpdateStatusReservationMutation();

  const handleCreateReservation = async () => {
    try {
      const reservation = await createReservation({
        guestsCount: Number(guestsCount),
        tableId: selectedTableId!,
        startTime: localToUtcIso(undefined, startReservationTime),
        endTime: localToUtcIso(undefined, endReservationTime),
      }).unwrap();
      await updateStatusReservation({
        id: reservation.id,
        status: "SEATED",
      });
      showSuccess("Бронирование успешно создано");
      close();
    } catch (error: any) {
      showError(error.data.message || "Ошибка при создании бронирования");
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Ручная посадка гостей">
      <Stack gap="8">
        <Divider label="Выберите время" />
        <Group justify="center" align="end">
          <TimePicker
            label="Время начала"
            value={startReservationTime}
            setValue={setStartReservationTime}
          />

          <TimePicker
            label="Время окончания"
            value={endReservationTime}
            setValue={setEndReservationTime}
          />
        </Group>
        <Divider label="Выберите свободный стол" />
        <Group gap="sm">
          {freeTables?.map((table) => (
            <Badge
              key={table.id}
              color="green"
              variant={selectedTableId === table.id ? "filled" : "outline"}
              size="lg"
              onClick={() => setSelectedTableId(table.id)}
              style={{ cursor: "pointer" }}
            >
              № {table.number} | {TableSeats[table.type]} мест
            </Badge>
          ))}
        </Group>
        <Divider label="Выберите количество гостей" />
        <NumberInput
          label="Количество гостей"
          placeholder="Выберите количество гостей"
          min={1}
          max={8}
          value={guestsCount}
          onChange={setGuestsCount}
        />
        <Button onClick={handleCreateReservation}>Разместить</Button>
      </Stack>
    </Modal>
  );
}
