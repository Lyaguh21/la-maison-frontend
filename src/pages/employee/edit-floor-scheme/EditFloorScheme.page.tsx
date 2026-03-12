import { useState, useCallback, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box } from "@mantine/core";

import SelectTablePanel from "./components/SelectTablePanel";
import {
  TableTemplate,
  PlacedTable,
  GRID_COLS,
  GRID_ROWS,
  TABLE_TEMPLATES,
} from "./model/type";
import GridTablePanel from "./components/GridTablePanel";
import PropertyTablePanel from "./components/PropertyTablePanel";
import TableDragOverlay from "./components/TableDragOverlay";

export default function EditFloorScheme() {
  const [tables, setTables] = useState<PlacedTable[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragData, setDragData] = useState<{
    type: "template" | "placed";
    template: TableTemplate;
    rotation: 0 | 90 | 180 | 270;
    offsetX?: number;
    offsetY?: number;
  } | null>(null);

  const idCounter = useRef(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const selectedTable = tables.find((t) => t.id === selectedId) ?? null;

  //*  Проверка пересечений
  const checkOverlap = useCallback(
    (
      x: number,
      y: number,
      w: number,
      h: number,
      excludeId?: string,
    ): boolean => {
      return tables.some((t) => {
        if (t.id === excludeId) return false;
        const tRotated = t.rotation === 90 || t.rotation === 270;
        const tw = tRotated ? t.height : t.width;
        const th = tRotated ? t.width : t.height;
        return (
          x < t.gridX + tw &&
          x + w > t.gridX &&
          y < t.gridY + th &&
          y + h > t.gridY
        );
      });
    },
    [tables],
  );

  //* Проверка границ
  const checkBounds = (x: number, y: number, w: number, h: number) => {
    return x >= 0 && y >= 0 && x + w <= GRID_COLS && y + h <= GRID_ROWS;
  };

  //* Drag n Drop

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const data = active.data.current;

    if (data?.type === "template") {
      setDragData({
        type: "template",
        template: data.template,
        rotation: 0,
      });
    } else if (data?.type === "placed") {
      const table = data.table as PlacedTable;
      const tpl = TABLE_TEMPLATES.find((t) => t.id === table.templateId)!;
      setDragData({
        type: "placed",
        template: tpl,
        rotation: table.rotation,
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !dragData) {
      setDragData(null);
      return;
    }

    const cellData = over.data.current;
    if (!cellData || cellData.col == null || cellData.row == null) {
      setDragData(null);
      return;
    }

    const col = cellData.col as number;
    const row = cellData.row as number;

    const isRotated = dragData.rotation === 90 || dragData.rotation === 270;
    const w = isRotated ? dragData.template.height : dragData.template.width;
    const h = isRotated ? dragData.template.width : dragData.template.height;

    // Центрируем стол на ячейку, куда бросили
    const placeX = Math.max(
      0,
      Math.min(col - Math.floor(w / 2), GRID_COLS - w),
    );
    const placeY = Math.max(
      0,
      Math.min(row - Math.floor(h / 2), GRID_ROWS - h),
    );

    if (!checkBounds(placeX, placeY, w, h)) {
      setDragData(null);
      return;
    }

    const activeData = active.data.current;

    if (activeData?.type === "template") {
      // Новый стол
      if (checkOverlap(placeX, placeY, w, h)) {
        setDragData(null);
        return;
      }

      const newId = `table-${++idCounter.current}`;
      const newTable: PlacedTable = {
        id: newId,
        templateId: dragData.template.id,
        label: dragData.template.label,
        gridX: placeX,
        gridY: placeY,
        width: dragData.template.width,
        height: dragData.template.height,
        rotation: 0,
        color: dragData.template.color,
        number: null,
        photo: null,
      };
      setTables((prev) => [...prev, newTable]);
      setSelectedId(newId);
    } else if (activeData?.type === "placed") {
      // Перемещение существующего
      const table = activeData.table as PlacedTable;
      if (checkOverlap(placeX, placeY, w, h, table.id)) {
        setDragData(null);
        return;
      }

      setTables((prev) =>
        prev.map((t) =>
          t.id === table.id ? { ...t, gridX: placeX, gridY: placeY } : t,
        ),
      );
    }

    setDragData(null);
  };

  const handleSave = () => {
    const payload = tables.map((t) => ({
      id: t.id,
      templateId: t.templateId,
      gridX: t.gridX,
      gridY: t.gridY,
      width: t.width,
      height: t.height,
      rotation: t.rotation,
      number: t.number,
      photo: t.photo ? "(base64 data)" : null,
    }));
    console.log("💾 Сохранение столов:", JSON.stringify(payload, null, 2));
    console.log("Всего столов:", tables.length);
  };

  //* Действия со столами

  const handleRotate = useCallback(
    (id: string) => {
      setTables((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const nextRotation = ((t.rotation + 90) % 360) as 0 | 90 | 180 | 270;
          const isNewRotated = nextRotation === 90 || nextRotation === 270;
          const nw = isNewRotated ? t.height : t.width;
          const nh = isNewRotated ? t.width : t.height;

          // Корректируем позицию чтобы не вышел за границы
          let nx = t.gridX;
          let ny = t.gridY;
          if (nx + nw > GRID_COLS) nx = GRID_COLS - nw;
          if (ny + nh > GRID_ROWS) ny = GRID_ROWS - nh;
          if (nx < 0) nx = 0;
          if (ny < 0) ny = 0;

          if (checkOverlap(nx, ny, nw, nh, t.id)) {
            // Нельзя повернуть — пересечение
            return t;
          }

          return { ...t, rotation: nextRotation, gridX: nx, gridY: ny };
        }),
      );
    },
    [checkOverlap],
  );

  const handleDelete = useCallback((id: string) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleSetNumber = useCallback((id: string, num: number | null) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, number: num } : t)),
    );
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Box
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Шаблоны для перетаскивания */}
        <SelectTablePanel tables={tables} handleSave={handleSave} />

        {/* Сетка столов */}
        <GridTablePanel
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          gridRef={gridRef}
          tables={tables}
          handleRotate={handleRotate}
          handleDelete={handleDelete}
        />

        {/* Свойства столов */}
        <PropertyTablePanel
          selectedTable={selectedTable}
          setSelectedId={setSelectedId}
          handleSetNumber={handleSetNumber}
          handleRotate={handleRotate}
          handleDelete={handleDelete}
        />
      </Box>

      {/*Оверлей при перетаскивании  */}
      <DragOverlay dropAnimation={null}>
        {dragData && (
          <TableDragOverlay
            template={dragData.template}
            rotation={dragData.rotation}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
