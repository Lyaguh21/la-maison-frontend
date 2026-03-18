import { Button, Text, Stack, useMantineTheme, Modal } from "@mantine/core";
import { getTimeRange, TimeGrid } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

export default function TimePicker({
  label,
  value,
  setValue,
}: {
  label: string;
  value: null | string;
  setValue: (value: null | string) => void;
}) {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Stack gap={0}>
        <Text c={theme.colors.dark[3]} fz="xs" fw={500}>
          {label}
        </Text>
        <Button onClick={open} w={180}>
          {value ? value.substring(0, 5) : "Выберите время"}
        </Button>
      </Stack>

      <Modal title="Выберите время" opened={opened} onClose={close}>
        <TimeGrid
          data={getTimeRange({
            startTime: "10:00",
            endTime: "23:00",
            interval: "00:15",
          })}
          simpleGridProps={{
            type: "container",
            cols: { base: 1, "180px": 2, "320px": 3 },
            spacing: "xs",
          }}
          withSeconds={false}
          value={value}
          onChange={(time) => {
            setValue(time);
            close();
          }}
        />
      </Modal>
    </>
  );
}
