import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  GRID_COLS,
  CELL_SIZE,
  GRID_ROWS,
  isRotatedFloorItem,
} from "../model/helpers";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { IconRotateClockwise, IconTrash } from "@tabler/icons-react";
import { PlacedFloorItem } from "@/entities/floor-items";
import { IReservation } from "@/entities/reservation";
import { useAppDispatch } from "@/shared/lib";
import { useMediaQuery } from "@mantine/hooks";
import { setOpenReservationPanel } from "@/entities/view";

//* Перетаскиваемый размещённый объект
function DraggablePlacedFloorItem({
  reservationOnTime,
  typeItem,
  item,
  isSelected,
  onSelect,
  onRotate,
  onDelete,
}: {
  reservationOnTime?: IReservation;
  typeItem: "View" | "Edit";
  item: PlacedFloorItem;
  isSelected: boolean;
  onSelect: () => void;
  onRotate: () => void;
  onDelete: () => void;
}) {
  const isSmall = useMediaQuery("(max-width: 1024px)");
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `placed-${item.clientId}`,
    data: { type: "placed", item },
  });

  const isRotated = isRotatedFloorItem(item.rotation);
  const displayW = isRotated ? item.height : item.width;
  const displayH = isRotated ? item.width : item.height;

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        if (typeItem === "View" && isSmall) {
          dispatch(setOpenReservationPanel(true));
        }
      }}
      style={{
        position: "absolute",
        left: item.gridX * CELL_SIZE,
        top: item.gridY * CELL_SIZE,
        width: displayW * CELL_SIZE,
        height: displayH * CELL_SIZE,
        opacity: isDragging ? 0.3 : 1,
        zIndex: isSelected ? 10 : 5,
        cursor: typeItem === "View" ? "pointer" : "grab",
        touchAction: "none",
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          borderRadius: item.radius,
          backgroundColor: reservationOnTime ? "#7d7d7d" : item.color,

          border: isSelected ? "3px solid #fff" : "2px solid rgba(0,0,0,0.2)",
          boxShadow: isSelected
            ? "0 0 0 2px #228be6, 0 4px 12px rgba(0,0,0,0.3)"
            : "0 2px 6px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Text
          c="white"
          fw={700}
          fz="sm"
          ta="center"
          size="sm"
          style={{ zIndex: 1, textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {item.type === "TABLE" && item.number != null
            ? `№${item.number}`
            : item.shortLabel}
        </Text>

        {isSelected && typeItem === "Edit" && (
          <Group
            gap={2}
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              zIndex: 10,
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

        {reservationOnTime && (
          <Group
            gap={2}
            style={{
              position: "absolute",
              top: 2,
              zIndex: 10,
            }}
            justify="center"
          >
            <Text size="xs" fw={600} c={theme.white}>
              Забронирован
            </Text>
            <Text c="white" size="xs">
              {new Date(reservationOnTime.startTime).toLocaleTimeString(
                "ru-RU",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}{" "}
              -{" "}
              {new Date(reservationOnTime.endTime).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
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
  reservationsData,
  typePanel,
  selectedId,
  setSelectedId,
  items,
  handleRotate,
  handleDelete,
}: {
  reservationsData?: IReservation[];
  typePanel: "View" | "Edit";
  selectedId: string | null;
  setSelectedId: (el: string | null) => void;
  items: PlacedFloorItem[];
  handleRotate?: (id: string) => void;
  handleDelete?: (id: string) => void;
}) {
  const gridCells = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      gridCells.push(<GridCell key={`${c}-${r}`} col={c} row={r} />);
    }
  }

  return (
    <Flex
      align="center"
      flex={1}
      justify="center"
      style={{
        overflow: "auto",
        height: "100%",
      }}
      onClick={() => setSelectedId(null)}
    >
      <Paper
        shadow="lg"
        p={0}
        style={{
          position: "relative",
          width: GRID_COLS * CELL_SIZE,
          height: GRID_ROWS * CELL_SIZE,
          backgroundColor: "#fff",
          borderRadius: 8,
          overflow: "auto",
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

        {/* Размещённые объекты */}
        {items.map((item) => (
          <DraggablePlacedFloorItem
            reservationOnTime={reservationsData?.find(
              (res) =>
                res.tableId === item.tableId && res.status !== "CANCELLED",
            )}
            typeItem={typePanel}
            key={item.clientId}
            item={item}
            isSelected={selectedId === item.clientId}
            onSelect={() => setSelectedId(item.clientId)}
            onRotate={() => handleRotate?.(item.clientId)}
            onDelete={() => handleDelete?.(item.clientId)}
          />
        ))}
      </Paper>
    </Flex>
  );
}
