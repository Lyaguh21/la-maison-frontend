import { PlacedFloorItem, useGetFloorItemsQuery } from "@/entities/floor-items";
import { mapFloorItemDtoToPlacedItem } from "@/features/floor-scheme/model/helpers";
import GridTablePanel from "@/features/floor-scheme/ui/GridTablePanel";
import { ActionIcon, Flex, Group, Stack, Box } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { MiniCalendar } from "@mantine/dates";
import { TimePicker } from "@/shared/ui";
import { useGetReservationsInRangeQuery } from "@/entities/reservation";
import ReservationPanel from "./components/ReservationPanel";
import { IconMenu2 } from "@tabler/icons-react";
import { useAppDispatch } from "@/shared/lib";
import { setOpenReservationPanel } from "@/entities/view";
import { formattedDate } from "@/shared/helpers";

export default function Booking() {
  const dispatch = useAppDispatch();
  const idCounter = useRef(0);

  const { data } = useGetFloorItemsQuery();
  const [items, setItems] = useState<PlacedFloorItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem =
    items.find((item) => item.clientId === selectedId) ?? null;

  //? Дата и время бронирования
  const [dateReservation, setDateReservation] = useState<string>(
    formattedDate({}),
  );
  const [startReservationTime, setStartReservationTime] = useState<
    string | null
  >("10:00");
  const [endReservationTime, setEndReservationTime] = useState<string | null>(
    "12:00",
  );

  //? Получение броней в отрезке
  const { data: reservationsData } = useGetReservationsInRangeQuery({
    day: dateReservation,
    startTime: startReservationTime?.substring(0, 5) ?? "10:00:00",
    endTime: endReservationTime?.substring(0, 5) ?? "12:00:00",
  });

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
    <Flex flex={1} h="100%">
      <ActionIcon
        size="36"
        onClick={() => dispatch(setOpenReservationPanel(true))}
        hiddenFrom="md"
        style={{ justifySelf: "end" }}
        pos="absolute"
        right={16}
        mt={16}
      >
        <IconMenu2 />
      </ActionIcon>
      <Stack p="md" gap="md" flex={1}>
        <MiniCalendar
          mx="auto"
          value={dateReservation}
          onChange={setDateReservation}
          numberOfDays={6}
        />
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

        <Box miw={0} maw="100vw" style={{ overflow: "auto" }}>
          <GridTablePanel
            reservationsData={reservationsData}
            typePanel="View"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            items={items}
          />
        </Box>
      </Stack>
      <ReservationPanel
        startReservationTime={startReservationTime}
        endReservationTime={endReservationTime}
        dateReservation={dateReservation}
        selectedItem={selectedItem}
      />
    </Flex>
  );
}
 

