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
import { TABLE_TEMPLATES, TableTemplate } from "../model/type";
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
      <Group wrap="nowrap">
        <Box
          style={{
            width: template.width * 15,
            height: template.height * 15,
            backgroundColor: template.color,
            borderRadius: template.radius,
            minWidth: 20,
            minHeight: 20,
          }}
        />
        <div>
          <Text fw={600} size="sm">
            {template.label}
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
  handleSave,
}: {
  handleSave: () => void;
}) {
  return (
    <Paper
      shadow="md"
      p="md"
      style={{
        flexShrink: 0,
        borderRight: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text ta="center" fz="lg" fw={600} mb="sm">
        Шаблоны столов
      </Text>
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

      <Box style={{ flex: 1 }} />

      <Button
        fullWidth
        leftSection={<IconDeviceFloppy size={18} />}
        color="green"
        onClick={handleSave}
      >
        Сохранить план
      </Button>
    </Paper>
  );
}
