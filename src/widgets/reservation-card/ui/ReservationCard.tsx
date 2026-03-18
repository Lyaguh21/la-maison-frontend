import { IReservation } from "@/entities/reservation";
import { Modal, Paper, Stack, useModalsStack } from "@mantine/core";
import ManagerReservationModal from "./components/ManagerReservationModal";
import MainInfoSection from "./sections/MainInfo.section";
import Header from "./sections/Header.section";
import FooterSection from "./sections/Footer.section";
import OrdersTableSection from "./sections/OrdersTable.section";
import CreateOrderModal from "./components/CreateOrderModal";

export default function ReservationCard({
  reservation,
}: {
  reservation: IReservation;
}) {
  const stack = useModalsStack(["menu", "add-order"]);

  return (
    <>
      <Modal.Stack>
        <ManagerReservationModal stack={stack} reservation={reservation} />
        <CreateOrderModal stack={stack} reservation={reservation} />
      </Modal.Stack>

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
          <FooterSection stack={stack} reservation={reservation} />
        </Stack>
      </Paper>
    </>
  );
}
