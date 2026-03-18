import {
  IReservation,
  useUpdateStatusReservationMutation,
} from "@/entities/reservation";
import { useNotifications } from "@/shared/lib";
import { Modal, Stack, Button } from "@mantine/core";
import { IconPlus, IconCash, IconCheck } from "@tabler/icons-react";

export default function ManagerReservationModal({
  stack,
  reservation,
}: {
  stack: any;
  reservation: IReservation;
}) {
  const { showError, showSuccess } = useNotifications();

  const [updateStatus] = useUpdateStatusReservationMutation();

  const handleChangeStatus = async () => {
    try {
      if (reservation.status === "SEATED") {
        await updateStatus({ id: reservation.id, status: "PAID" }).unwrap();
      } else if (reservation.status === "PAID") {
        await updateStatus({
          id: reservation.id,
          status: "COMPLETED",
        }).unwrap();
      }
      showSuccess("Статус бронирования обновлен");
    } catch (e) {
      showError("Ошибка при обновлении статуса бронирования");
    } finally {
      stack.closeAll();
    }
  };

  return (
    <Modal {...stack.register("menu")} title="Управление бронью">
      <Stack>
        <Button
          onClick={() => stack.open("add-order")}
          leftSection={<IconPlus size={16} />}
          variant="default"
        >
          Добавить заказ
        </Button>
        <Button
          onClick={handleChangeStatus}
          leftSection={
            reservation.status === "SEATED" ? (
              <IconCash size={16} />
            ) : (
              <IconCheck size={16} />
            )
          }
          color="green"
        >
          {reservation.status === "SEATED"
            ? "Оплатить заказ"
            : "Завершить бронь"}
        </Button>
      </Stack>
    </Modal>
  );
}
