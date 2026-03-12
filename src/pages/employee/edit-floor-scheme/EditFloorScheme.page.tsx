import { useEffect, useState, useCallback, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box, Center, Loader, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNotifications } from "@/shared/lib";

import SelectTablePanel from "./components/SelectTablePanel";
import {
  GRID_COLS,
  GRID_ROWS,
  getFloorItemTemplateById,
  isRotatedFloorItem,
  isTableFloorItem,
  mapFloorItemDtoToPlacedItem,
  mapPlacedItemToSyncDto,
} from "./model/type";
import GridTablePanel from "./components/GridTablePanel";
import PropertyTablePanel from "./components/PropertyTablePanel";
import TableDragOverlay from "./components/TableDragOverlay";

import { AnimatePresence, motion } from "motion/react";
import {
  useGetFloorItemsQuery,
  useGetTablesQuery,
  useSyncFloorItemsMutation,
  PlacedFloorItem,
  FloorItemTemplate,
  FloorItemRotation,
} from "@/entities/floor-items";

export default function EditFloorScheme() {
  const { showError, showSuccess } = useNotifications();
  const { data, isLoading, isError } = useGetFloorItemsQuery();
  const { data: existingTables } = useGetTablesQuery();
  const [syncFloorItems, { isLoading: isSaving }] = useSyncFloorItemsMutation();

  const [items, setItems] = useState<PlacedFloorItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragData, setDragData] = useState<{
    type: "template" | "placed";
    template: FloorItemTemplate;
    rotation: FloorItemRotation;
  } | null>(null);

  const idCounter = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const selectedItem =
    items.find((item) => item.clientId === selectedId) ?? null;

  const isWide = useMediaQuery("(min-width: 1200px)");

  const mapServerItems = useCallback((nextItems: typeof data) => {
    idCounter.current = 0;

    return (nextItems ?? []).map((item) =>
      mapFloorItemDtoToPlacedItem(item, `floor-item-${++idCounter.current}`),
    );
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    setItems(mapServerItems(data));
    setSelectedId(null);
  }, [data, mapServerItems]);

  //*  Проверка пересечений
  const checkOverlap = useCallback(
    (
      x: number,
      y: number,
      w: number,
      h: number,
      excludeId?: string,
    ): boolean => {
      return items.some((item) => {
        if (item.clientId === excludeId) return false;
        const itemRotated = isRotatedFloorItem(item.rotation);
        const tw = itemRotated ? item.height : item.width;
        const th = itemRotated ? item.width : item.height;
        return (
          x < item.gridX + tw &&
          x + w > item.gridX &&
          y < item.gridY + th &&
          y + h > item.gridY
        );
      });
    },
    [items],
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
      const item = data.item as PlacedFloorItem;
      setDragData({
        type: "placed",
        template: getFloorItemTemplateById(item.templateId),
        rotation: item.rotation,
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

    const isRotated = isRotatedFloorItem(dragData.rotation);
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
      if (checkOverlap(placeX, placeY, w, h)) {
        setDragData(null);
        return;
      }

      const newId = `floor-item-${++idCounter.current}`;
      const newItem: PlacedFloorItem = {
        clientId: newId,
        templateId: dragData.template.id,
        type: dragData.template.type,
        label: dragData.template.label,
        shortLabel: dragData.template.shortLabel,
        gridX: placeX,
        gridY: placeY,
        width: dragData.template.width,
        height: dragData.template.height,
        rotation: 0,
        color: dragData.template.color,
        radius: dragData.template.radius,
        number: null,
        //@ts-ignore
        tableType:
          dragData.template.type === "TABLE" ? dragData.template.id : undefined,
      };
      setItems((prev) => [...prev, newItem]);
      setSelectedId(newId);
    } else if (activeData?.type === "placed") {
      const item = activeData.item as PlacedFloorItem;
      if (checkOverlap(placeX, placeY, w, h, item.clientId)) {
        setDragData(null);
        return;
      }

      setItems((prev) =>
        prev.map((t) =>
          t.clientId === item.clientId
            ? { ...t, gridX: placeX, gridY: placeY }
            : t,
        ),
      );
    }

    setDragData(null);
  };

  const handleSave = async () => {
    const invalidTable = items.find(
      (item) => isTableFloorItem(item) && item.number == null,
    );

    const tableNumbers = items
      .filter(isTableFloorItem)
      .map((item) => item.number)
      .filter((value): value is number => value != null);

    const hasDuplicateNumbers =
      new Set(tableNumbers).size !== tableNumbers.length;

    if (invalidTable) {
      setSelectedId(invalidTable.clientId);
      showError("Укажите номер для каждого стола перед сохранением.");
      return;
    }

    if (hasDuplicateNumbers) {
      showError("Номера столов должны быть уникальными.");
      return;
    }

    // Проверяем уникальность номеров относительно всех столов в базе
    if (existingTables && existingTables.length) {
      const conflict = items
        .filter(isTableFloorItem)
        .find(
          (item) =>
            item.number != null &&
            existingTables.some(
              (t) => t.number === item.number && t.id !== item.tableId,
            ),
        );

      if (conflict) {
        setSelectedId(conflict.clientId);
        showError(`Номер стола ${conflict.number} уже занят в базе.`);
        return;
      }
    }

    try {
      const response = await syncFloorItems({
        items: items.map(mapPlacedItemToSyncDto),
      }).unwrap();

      setItems(mapServerItems(response));
      setSelectedId(null);
      showSuccess("Схема зала сохранена.");
    } catch (err: any) {
      const msg =
        err?.data?.message ??
        err?.message ??
        "Не удалось сохранить схему зала.";
      showError(msg);
    }
  };

  //* Действия с объектами

  const handleRotate = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.clientId !== id) return item;
          const nextRotation = ((item.rotation + 90) %
            360) as FloorItemRotation;
          const isNewRotated = isRotatedFloorItem(nextRotation);
          const nw = isNewRotated ? item.height : item.width;
          const nh = isNewRotated ? item.width : item.height;

          let nx = item.gridX;
          let ny = item.gridY;
          if (nx + nw > GRID_COLS) nx = GRID_COLS - nw;
          if (ny + nh > GRID_ROWS) ny = GRID_ROWS - nh;
          if (nx < 0) nx = 0;
          if (ny < 0) ny = 0;

          if (checkOverlap(nx, ny, nw, nh, item.clientId)) {
            return item;
          }

          return { ...item, rotation: nextRotation, gridX: nx, gridY: ny };
        }),
      );
    },
    [checkOverlap],
  );

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.clientId !== id));
    setSelectedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleSetNumber = useCallback((id: string, num: number | null) => {
    setItems((prev) =>
      prev.map((t) => (t.clientId === id ? { ...t, number: num } : t)),
    );
  }, []);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader color="blue" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh">
        <Text c="red">Не удалось загрузить схему зала.</Text>
      </Center>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: isWide ? "row" : "column",
            minHeight: "100vh",
            overflow: "hidden",
            backgroundColor: "#f8f9fa",
          }}
        >
          <AnimatePresence>
            {/** Left panel: shown as sidebar on wide, as top stacked on narrow */}
            {isWide ? (
              <motion.div
                key="select-left"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                style={{ display: "flex" }}
              >
                <SelectTablePanel handleSave={handleSave} isSaving={isSaving} />
              </motion.div>
            ) : (
              <motion.div
                key="select-top"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <SelectTablePanel handleSave={handleSave} isSaving={isSaving} />
              </motion.div>
            )}
          </AnimatePresence>

          <Box style={{ flex: 1, minWidth: 0 }}>
            <GridTablePanel
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              items={items}
              handleRotate={handleRotate}
              handleDelete={handleDelete}
            />
          </Box>

          <Box style={{ width: 260, flexShrink: 0, display: "flex" }}>
            <AnimatePresence>
              {isWide && selectedItem && (
                <motion.div
                  key="prop-right"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                  style={{ display: "flex", width: "100%" }}
                >
                  <PropertyTablePanel
                    selectedItem={selectedItem}
                    handleSetNumber={handleSetNumber}
                    handleRotate={handleRotate}
                    handleDelete={handleDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          {!isWide && (
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  key="prop-bottom"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  style={{ width: "100%" }}
                >
                  <PropertyTablePanel
                    selectedItem={selectedItem}
                    handleSetNumber={handleSetNumber}
                    handleRotate={handleRotate}
                    handleDelete={handleDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Box>

        <DragOverlay dropAnimation={null}>
          {dragData && (
            <TableDragOverlay
              template={dragData.template}
              rotation={dragData.rotation}
            />
          )}
        </DragOverlay>
      </DndContext>
    </>
  );
}
