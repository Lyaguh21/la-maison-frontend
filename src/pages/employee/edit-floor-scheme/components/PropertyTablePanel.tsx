import { PlacedFloorItem } from "@/entities/floor-items";
import {
  Paper,
  Divider,
  ScrollArea,
  Stack,
  Card,
  Group,
  Badge,
  NumberInput,
  Box,
  Button,
  Tooltip,
  Text,
} from "@mantine/core";
import { IconRotateClockwise, IconTrash } from "@tabler/icons-react";

export default function PropertyTablePanel({
  selectedItem,
  handleSetNumber,
  handleRotate,
  handleDelete,
}: {
  selectedItem: PlacedFloorItem | null;
  handleSetNumber: (id: string, val: number | null) => void;
  handleRotate: (id: string) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <Paper
      shadow="md"
      p="md"
      //@ts-ignore
      style={{
        width: "100%",
        maxWidth: { xl: 260 },
        flexShrink: 0,
        borderLeft: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text ta="center" fz="lg" fw={600} mb="sm">
        Свойства объекта
      </Text>
      <Divider mb="sm" />

      {selectedItem ? (
        <ScrollArea style={{ flex: 1 }}>
          <Stack gap="md">
            <Card withBorder padding="sm">
              <Group justify="space-between">
                <Text size="sm" fw={600}>
                  Floor item ID
                </Text>
                <Badge variant="light">
                  {selectedItem.id != null ? selectedItem.id : "new"}
                </Badge>
              </Group>
            </Card>

            <Card withBorder padding="sm">
              <Group justify="space-between" mb={4}>
                <Text size="sm" fw={600}>
                  Шаблон
                </Text>
                <Badge color={selectedItem.color} variant="filled">
                  {selectedItem.label}
                </Badge>
              </Group>

              <Group justify="space-between" mb={4}>
                <Text size="xs" c="dimmed">
                  Тип объекта
                </Text>
                <Text size="xs">{selectedItem.type}</Text>
              </Group>

              {selectedItem.type === "TABLE" && (
                <Group justify="space-between" mb={4}>
                  <Text size="xs" c="dimmed">
                    Table ID
                  </Text>
                  <Text size="xs">
                    {selectedItem.tableId != null
                      ? selectedItem.tableId
                      : "new"}
                  </Text>
                </Group>
              )}

              <Group justify="space-between">
                <Text size="xs" c="dimmed">
                  Поворот
                </Text>
                <Text size="xs">{selectedItem.rotation}°</Text>
              </Group>
            </Card>

            {selectedItem.type === "TABLE" ? (
              <NumberInput
                label="Номер стола"
                placeholder="Введите номер"
                min={1}
                max={999}
                value={selectedItem.number ?? ""}
                onChange={(val) =>
                  handleSetNumber(
                    selectedItem.clientId,
                    typeof val === "number" ? val : null,
                  )
                }
              />
            ) : (
              <Box>
                <Text size="sm" c="dimmed">
                  У этого типа объекта нет дополнительных полей.
                </Text>
              </Box>
            )}

            <Divider />

            <Stack>
              <Tooltip label="Повернуть на 90°">
                <Button
                  variant="light"
                  color="blue"
                  leftSection={<IconRotateClockwise size={16} />}
                  onClick={() => handleRotate(selectedItem.clientId)}
                >
                  Повернуть
                </Button>
              </Tooltip>
              <Tooltip label="Удалить объект">
                <Button
                  variant="light"
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  onClick={() => handleDelete(selectedItem.clientId)}
                >
                  Удалить
                </Button>
              </Tooltip>
            </Stack>
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
            Выберите объект на сетке
            <br />
            для редактирования свойств
          </Text>
        </Box>
      )}
    </Paper>
  );
}
