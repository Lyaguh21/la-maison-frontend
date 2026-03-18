import { IReservation } from "@/entities/reservation";
import { Paper, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ManagerReservationModal from "./components/ManagerReservationModal";
import MainInfoSection from "./sections/MainInfo.section";
import Header from "./sections/Header.section";
import FooterSection from "./sections/Footer.section";
import OrdersTableSection from "./sections/OrdersTable.section";

export default function ReservationCard({
  reservation,
}: {
  reservation: IReservation;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ManagerReservationModal
        opened={opened}
        close={close}
        reservation={reservation}
      />

      <Paper
        radius="md"
        withBorder
        shadow="sm"
        p="md"
        style={{ overflow: "visible" }}
      >
        <Stack gap="md">
          <Header reservation={reservation} />
          <MainInfoSection reservation={reservation} />

          <OrdersTableSection reservation={reservation} />
          <FooterSection open={open} reservation={reservation} />
        </Stack>
      </Paper>
    </>
  );
}
