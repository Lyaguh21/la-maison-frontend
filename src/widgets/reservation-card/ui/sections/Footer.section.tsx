import { IReservation } from "@/entities/reservation";
import { Divider, Group, ActionIcon, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

export default function FooterSection({
  reservation,
  open,
}: {
  reservation: IReservation;
  open: () => void;
}) {
  return (
    <>
      <Divider />
      <Group justify="space-between" align="center">
        <div>
          <Text size="xs" color="dimmed">
            Сумма заказа
          </Text>
          <Text size="sm">{reservation.totalPrice?.toFixed(2)} ₽</Text>
        </div>
        <ActionIcon size="lg" variant="light" onClick={open} title="Действия">
          <IconSettings />
        </ActionIcon>
      </Group>
    </>
  );
}
