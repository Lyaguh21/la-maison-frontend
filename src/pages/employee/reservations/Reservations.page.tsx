import { useGetAllReservationsOnDayQuery } from "@/entities/reservation";
import {
  ActionIcon,
  Flex,
  Grid,
  GridCol,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import FutureReservationCard from "./components/FutureReservationCard";
import { formattedDate } from "@/shared/helpers";
import ReservationCard from "./components/ReservationCard";
import { IconPlus } from "@tabler/icons-react";

export default function Reservations() {
  const { data: futureReservations } = useGetAllReservationsOnDayQuery({
    day: formattedDate({}),
    status: "BOOKED",
  });
  const { data: nowReservations } = useGetAllReservationsOnDayQuery({
    day: formattedDate({}),
    status: ["SEATED", "PAID"],
  });
  return (
    <Grid p={{ base: "md", lg: "xl" }} gutter="md" h="100vh" align="stretch">
      <GridCol span={{ base: 12, md: 4 }}>
        <Stack h="100%">
          <Group align="end" justify="space-between">
            <Title ta="center" order={2}>
              Ближайшие бронирования
            </Title>
            <ActionIcon>
              <IconPlus />
            </ActionIcon>
          </Group>
          <ScrollArea mah={{ base: 600, md: "100%" }}>
            <Stack>
              {futureReservations?.length === 0 && (
                <Flex justify="center" align="center" h="100%">
                  <Text c="dimmed">Нет ближайших бронирований</Text>
                </Flex>
              )}
              {futureReservations?.map((reservation) => (
                <FutureReservationCard
                  reservation={reservation}
                  key={reservation.id}
                />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </GridCol>

      <GridCol span={{ base: 12, md: 8 }}>
        <Stack h="100%">
          <Title ta="center" order={2}>
            Сейчас в зале
          </Title>
          <ScrollArea mah={{ base: 600, md: "100%" }}>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
              {nowReservations?.length === 0 && (
                <Flex justify="center" align="center" h="100%">
                  <Text c="dimmed">Посетителей нет</Text>
                </Flex>
              )}
              {nowReservations?.map((reservation) => (
                <ReservationCard
                  reservation={reservation}
                  key={reservation.id}
                />
              ))}
            </SimpleGrid>
          </ScrollArea>
        </Stack>
      </GridCol>
    </Grid>
  );
}
