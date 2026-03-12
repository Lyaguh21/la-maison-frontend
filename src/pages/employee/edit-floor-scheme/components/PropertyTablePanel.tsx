import {
  Paper,
  Title,
  Divider,
  ScrollArea,
  Stack,
  Card,
  Group,
  Badge,
  NumberInput,
  FileInput,
  Box,
  Button,
  Tooltip,
  Text,
  Image,
} from "@mantine/core";
import { IconPhoto, IconRotateClockwise, IconTrash } from "@tabler/icons-react";
import { PlacedTable } from "../model/type";

export default function PropertyTablePanel({
  selectedTable,
  handleSetNumber,
  handleRotate,
  handleDelete,
}: {
  selectedTable: PlacedTable | null;
  setSelectedId: any;
  handleSetNumber: (id: string, val: number | null) => void;
  handleRotate: (id: string) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <Paper
      shadow="md"
      p="md"
      style={{
        width: 260,
        flexShrink: 0,
        borderLeft: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title order={5} mb="sm">
        ⚙️ Свойства стола
      </Title>
      <Divider mb="sm" />

      {selectedTable ? (
        <ScrollArea style={{ flex: 1 }}>
          <Stack gap="md">
            <Card withBorder padding="sm">
              <Group justify="space-between">
                <Text size="sm" fw={600}>
                  ID
                </Text>
                <Badge variant="light">{selectedTable.id}</Badge>
              </Group>
            </Card>

            <Card withBorder padding="sm">
              <Group justify="space-between" mb={4}>
                <Text size="sm" fw={600}>
                  Шаблон
                </Text>
                <Badge color={selectedTable.color} variant="filled">
                  {selectedTable.label}
                </Badge>
              </Group>
              <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">
                  Позиция
                </Text>
                <Text size="xs">
                  ({selectedTable.gridX}, {selectedTable.gridY})
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Поворот
                </Text>
                <Text size="xs">{selectedTable.rotation}°</Text>
              </Group>
            </Card>

            <NumberInput
              label="Номер стола"
              placeholder="Введите номер"
              min={1}
              max={999}
              value={selectedTable.number ?? ""}
              onChange={(val) =>
                handleSetNumber(
                  selectedTable.id,
                  typeof val === "number" ? val : null,
                )
              }
            />

            <FileInput
              label="Фото стола"
              placeholder="Загрузить фото"
              accept="image/*"
              leftSection={<IconPhoto size={16} />}
            />

            {selectedTable.photo && (
              <Box>
                <Text size="xs" c="dimmed" mb={4}>
                  Превью:
                </Text>
                <Image
                  src={selectedTable.photo}
                  alt="preview"
                  radius="sm"
                  h={120}
                  fit="cover"
                />
                <Button variant="subtle" color="red" size="xs" fullWidth mt={4}>
                  Удалить фото
                </Button>
              </Box>
            )}

            <Divider />

            <Group grow>
              <Tooltip label="Повернуть на 90°">
                <Button
                  variant="light"
                  leftSection={<IconRotateClockwise size={16} />}
                  onClick={() => handleRotate(selectedTable.id)}
                >
                  Повернуть
                </Button>
              </Tooltip>
              <Tooltip label="Удалить стол">
                <Button
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDelete(selectedTable.id)}
                >
                  Удалить
                </Button>
              </Tooltip>
            </Group>
          </Stack>
        </ScrollArea>
      ) : (
        <Box
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text size="sm" c="dimmed" ta="center">
            Выберите стол на сетке
            <br />
            для редактирования свойств
          </Text>
        </Box>
      )}
    </Paper>
  );
}
