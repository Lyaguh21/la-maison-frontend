import {
  Paper,
  Title,
  Divider,
  Stack,
  Box,
  Button,
  Text,
  Group,
} from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { PlacedTable, TABLE_TEMPLATES, TableTemplate } from "../model/type";
import { useDraggable } from "@dnd-kit/core";

//* Перетаскиваемый шаблон
function DraggableTemplate({ template }: { template: TableTemplate }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${template.id}`,
    data: { type: "template", template },
  });

  return (
    <Paper
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      shadow="sm"
      p="sm"
      withBorder
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <Group>
        <Box
          style={{
            width: template.width * 20,
            height: template.height * 20,
            backgroundColor: template.color,
            borderRadius: 4,
            minWidth: 40,
            minHeight: 40,
          }}
        />
        <div>
          <Text fw={600} size="sm">
            Стол {template.label}
          </Text>
          <Text size="xs" c="dimmed">
            {template.width}×{template.height} клеток
          </Text>
        </div>
      </Group>
    </Paper>
  );
}

export default function SelectTablePanel({
  tables,
  handleSave,
}: {
  tables: PlacedTable[];
  handleSave: () => void;
}) {
  return (
    <Paper
      shadow="md"
      p="md"
      style={{
        width: 220,
        flexShrink: 0,
        borderRight: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title order={5} mb="sm">
        Шаблоны столов
      </Title>
      <Divider mb="sm" />
      <Stack gap="sm">
        {TABLE_TEMPLATES.map((tpl) => (
          <DraggableTemplate key={tpl.id} template={tpl} />
        ))}
      </Stack>

      <Divider my="md" />

      <Text size="xs" c="dimmed" mb="xs">
        Перетащите стол на сетку
      </Text>
      <Text size="xs" c="dimmed" mb="xs">
        Клик по столу — выделить
      </Text>
      <Text size="xs" c="dimmed" mb="xs">
        Кнопки ↻ и 🗑 на выделенном столе
      </Text>

      <Box style={{ flex: 1 }} />

      <Button
        fullWidth
        leftSection={<IconDeviceFloppy size={18} />}
        color="green"
        onClick={handleSave}
      >
        Сохранить план
      </Button>
      <Text size="xs" c="dimmed" mt={4} ta="center">
        Столов размещено: {tables.length}
      </Text>
    </Paper>
  );
}
