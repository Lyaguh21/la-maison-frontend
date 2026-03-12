import { ActionIcon, Box, Group, Paper, Image, Text } from "@mantine/core";
import { GRID_COLS, CELL_SIZE, GRID_ROWS, PlacedTable } from "../model/type";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { IconRotateClockwise, IconTrash } from "@tabler/icons-react";

//* Перетаскиваемый размещённый стол
function DraggablePlacedTable({
  table,
  isSelected,
  onSelect,
  onRotate,
  onDelete,
}: {
  table: PlacedTable;
  isSelected: boolean;
  onSelect: () => void;
  onRotate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `placed-${table.id}`,
    data: { type: "placed", table },
  });

  const isRotated = table.rotation === 90 || table.rotation === 270;
  const displayW = isRotated ? table.height : table.width;
  const displayH = isRotated ? table.width : table.height;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      style={{
        position: "absolute",
        left: table.gridX * CELL_SIZE,
        top: table.gridY * CELL_SIZE,
        width: displayW * CELL_SIZE,
        height: displayH * CELL_SIZE,
        opacity: isDragging ? 0.3 : 1,
        zIndex: isSelected ? 10 : 5,
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: table.color,
          borderRadius: 6,
          border: isSelected ? "3px solid #fff" : "2px solid rgba(0,0,0,0.2)",
          boxShadow: isSelected
            ? "0 0 0 2px #228be6, 0 4px 12px rgba(0,0,0,0.3)"
            : "0 2px 6px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {table.photo && (
          <Image
            src={table.photo}
            alt="table"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        )}
        <Text
          c="white"
          fw={700}
          size="sm"
          style={{ zIndex: 1, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {table.number != null ? `№${table.number}` : table.label}
        </Text>
        <Text
          c="white"
          size="xs"
          style={{ zIndex: 1, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {table.rotation}°
        </Text>

        {isSelected && (
          <Group
            gap={2}
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              zIndex: 2,
            }}
          >
            <ActionIcon
              size="xs"
              variant="filled"
              color="blue"
              onClick={(e) => {
                e.stopPropagation();
                onRotate();
              }}
            >
              <IconRotateClockwise size={12} />
            </ActionIcon>
            <ActionIcon
              size="xs"
              variant="filled"
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <IconTrash size={12} />
            </ActionIcon>
          </Group>
        )}
      </Box>
    </Box>
  );
}

//* Ячейка сетки 

function GridCell({ col, row }: { col: number; row: number }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${col}-${row}`,
    data: { col, row },
  });

  return (
    <Box
      ref={setNodeRef}
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        border: "1px solid #dee2e6",
        backgroundColor: isOver ? "rgba(34,139,230,0.15)" : "transparent",
        boxSizing: "border-box",
      }}
    />
  );
}

export default function GridTablePanel({
  selectedId,
  setSelectedId,
  gridRef,
  tables,
  handleRotate,
  handleDelete,
}: {
  selectedId: string | null;
  setSelectedId: (el: string | null) => void;
  tables: PlacedTable[];
  gridRef: any;
  handleRotate: (id: string) => void;
  handleDelete: (id: string) => void;
}) {
  const gridCells = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      gridCells.push(<GridCell key={`${c}-${r}`} col={c} row={r} />);
    }
  }

  return (
    <Box
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: 24,
      }}
      onClick={() => setSelectedId(null)}
    >
      <Paper
        ref={gridRef}
        shadow="lg"
        p={0}
        style={{
          position: "relative",
          width: GRID_COLS * CELL_SIZE,
          height: GRID_ROWS * CELL_SIZE,
          backgroundColor: "#fff",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* Сетка */}
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_SIZE}px)`,
          }}
        >
          {gridCells}
        </Box>

        {/* Размещённые столы */}
        {tables.map((table: PlacedTable) => (
          <DraggablePlacedTable
            key={table.id}
            table={table}
            isSelected={selectedId === table.id}
            onSelect={() => setSelectedId(table.id)}
            onRotate={() => handleRotate(table.id)}
            onDelete={() => handleDelete(table.id)}
          />
        ))}
      </Paper>
    </Box>
  );
}
