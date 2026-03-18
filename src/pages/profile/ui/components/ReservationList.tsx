import { Stack, Text } from "@mantine/core";

import { IReservation } from "@/entities/reservation";
import { ReservationCard } from "@/widgets/reservation-card";

interface ReservationListProps {
  reservations: IReservation[];
  emptyMessage: string;
}

export default function ReservationList({
  reservations,
  emptyMessage,
}: ReservationListProps) {
  if (reservations?.length === 0) {
    return (
      <Text fz="sm" c="dimmed" ta="center" py="xl">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Stack gap="md">
      {reservations?.map((r) => (
        <ReservationCard reservation={r} />
      ))}
    </Stack>
  );
}
