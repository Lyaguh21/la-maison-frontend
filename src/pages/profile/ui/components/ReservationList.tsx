import { Stack, Text } from "@mantine/core";
import ReservationCard from "./ReservationCard";
import type { Reservation } from "./ReservationCard";

interface ReservationListProps {
  reservations: Reservation[];
  emptyMessage: string;
}

export default function ReservationList({
  reservations,
  emptyMessage,
}: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <Text fz="sm" c="dimmed" ta="center" py="xl">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Stack gap="md">
      {reservations.map((r) => (
        <ReservationCard key={r.id} reservation={r} />
      ))}
    </Stack>
  );
}
