import { Box, Text } from "@mantine/core";
import {
  CELL_SIZE,
  isRotatedFloorItem,
} from "@/features/floor-scheme/model/helpers";
import { FloorItemTemplate, FloorItemRotation } from "@/entities/floor-items";

export default function TableDragOverlay({
  template,
  rotation,
}: {
  template: FloorItemTemplate;
  rotation: FloorItemRotation;
}) {
  const isRotated = isRotatedFloorItem(rotation);
  const w = isRotated ? template.height : template.width;
  const h = isRotated ? template.width : template.height;

  return (
    <Box
      style={{
        width: w * CELL_SIZE,
        height: h * CELL_SIZE,
        backgroundColor: template.color,
        opacity: 0.7,
        borderRadius: template.radius,
        border: "2px dashed #fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <Text c="white" fw={700} size="sm">
        {template.shortLabel}
      </Text>
      <Text c="rgba(255,255,255,0.9)" size="xs">
        {template.label}
      </Text>
    </Box>
  );
}
