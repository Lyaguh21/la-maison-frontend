import { PlacedFloorItem, useGetFloorItemsQuery } from "@/entities/floor-items";
import { mapFloorItemDtoToPlacedItem } from "@/features/floor-scheme/model/helpers";
import GridTablePanel from "@/features/floor-scheme/ui/GridTablePanel";
import { Group, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { MiniCalendar } from "@mantine/dates";
import { TimePicker } from "@/shared/ui";

export default function Booking() {
  const isWide = useMediaQuery("(min-width: 1200px)");
  const idCounter = useRef(0);

  const { data } = useGetFloorItemsQuery();
  const [items, setItems] = useState<PlacedFloorItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem =
    items.find((item) => item.clientId === selectedId) ?? null;

  //? Дата и время бронирования
  const [dateReservation, setDateReservation] = useState<string | null>(() =>
    new Date().toISOString(),
  );
  const [startReservationTime, setStartReservationTime] = useState<
    string | null
  >(null);
  const [endReservationTime, setEndReservationTime] = useState<string | null>(
    null,
  );

  const mapServerItems = useCallback((nextItems: typeof data) => {
    idCounter.current = 0;

    return (nextItems ?? []).map((item) =>
      mapFloorItemDtoToPlacedItem(item, `floor-item-${++idCounter.current}`),
    );
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    setItems(mapServerItems(data));
    setSelectedId(null);
  }, [data, mapServerItems]);
  return (
    <Stack p="md" gap="md" flex={1}>
      <MiniCalendar
        mx="auto"
        value={dateReservation}
        onChange={setDateReservation}
        numberOfDays={6}
      />
      <Group justify="center">
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

      <GridTablePanel
        typePanel="View"
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={items}
      />
    </Stack>
  );
}
