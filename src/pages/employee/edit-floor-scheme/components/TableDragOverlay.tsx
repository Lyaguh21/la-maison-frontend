import { Box, Text } from "@mantine/core";
import { CELL_SIZE, TableTemplate } from "../model/type";

export default function TableDragOverlay({
  template,
  rotation,
}: {
  template: TableTemplate;
  rotation: 0 | 90 | 180 | 270;
}) {
  const isRotated = rotation === 90 || rotation === 270;
  const w = isRotated ? template.height : template.width;
  const h = isRotated ? template.width : template.height;

  return (
    <Box
      style={{
        width: w * CELL_SIZE,
        height: h * CELL_SIZE,
        backgroundColor: template.color,
        opacity: 0.7,
        borderRadius: 6,
        border: "2px dashed #fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Text c="white" fw={700} size="sm">
        {template.label}
      </Text>
    </Box>
  );
}
