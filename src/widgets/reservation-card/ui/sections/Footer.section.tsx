import { IReservation } from "@/entities/reservation";
import { Divider, Group, ActionIcon, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

export default function FooterSection({
  reservation,
  stack,
}: {
  reservation: IReservation;
  stack: any;
}) {
  return (
    <>
      <Divider />
      <Group justify="space-between" align="center">
        <div>
          <Text size="xs" color="dimmed">
            Сумма заказа
          </Text>
          <Text size="sm">
            {reservation.order
              ?.reduce((sum, item) => sum + item.totalPriceOrder, 0)
              ?.toFixed(2) ?? 0}{" "}
            ₽
          </Text>
        </div>
        {["SEATED", "PAID"].includes(reservation.status) ? (
          <ActionIcon
            size="lg"
            variant="light"
            onClick={() => stack.open("menu")}
            title="Действия"
          >
            <IconSettings />
          </ActionIcon>
        ) : null}
      </Group>
    </>
  );
}
