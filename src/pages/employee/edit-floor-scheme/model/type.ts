export type FloorItemType = "TABLE" | "WC" | "BAR" | "EXIT";
export type TableType = "TWO" | "FOUR" | "SIX";
export type FloorItemTemplateId = TableType | Exclude<FloorItemType, "TABLE">;
export type FloorItemRotation = 0 | 90 | 180 | 270;

export interface FloorItemTemplate {
  id: FloorItemTemplateId;
  type: FloorItemType;
  label: string;
  shortLabel: string;
  width: number;
  height: number;
  color: string;
  radius: number;
}

export interface PlacedFloorItem {
  clientId: string;
  id?: number;
  tableId?: number;
  type: FloorItemType;
  templateId: FloorItemTemplateId;
  label: string;
  shortLabel: string;
  gridX: number;
  gridY: number;
  width: number;
  height: number;
  rotation: FloorItemRotation;
  color: string;
  radius: number;
  number: number | null;
  tableType?: TableType;
}

export interface FloorItemDto {
  id: number;
  type: FloorItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  number?: number;
  tableType?: TableType;
  tableId?: number;
}

export interface SyncFloorItemDto {
  id?: number;
  type: FloorItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: FloorItemRotation;
  number?: number;
  tableType?: TableType;
  tableId?: number;
}

export const CELL_SIZE = 48;
export const GRID_COLS = 20;
export const GRID_ROWS = 15;

export const FLOOR_ITEM_TEMPLATES: FloorItemTemplate[] = [
  {
    id: "TWO",
    type: "TABLE",
    label: "Стол на двоих",
    shortLabel: "2",
    width: 2,
    height: 2,
    color: "#4c6ef5",
    radius: 4,
  },
  {
    id: "FOUR",
    type: "TABLE",
    label: "Стол на четверых",
    shortLabel: "4",
    width: 2,
    height: 3,
    color: "#40c057",
    radius: 4,
  },
  {
    id: "SIX",
    type: "TABLE",
    label: "Стол на шестерых",
    shortLabel: "6",
    width: 3,
    height: 3,
    color: "#fab005",
    radius: 32,
  },
  {
    id: "WC",
    type: "WC",
    label: "Туалет",
    shortLabel: "WC",
    width: 2,
    height: 2,
    color: "#e8590c",
    radius: 4,
  },
  {
    id: "BAR",
    type: "BAR",
    label: "Бар",
    shortLabel: "BAR",
    width: 3,
    height: 2,
    color: "#7048e8",
    radius: 4,
  },
  {
    id: "EXIT",
    type: "EXIT",
    label: "Выход",
    shortLabel: "EXIT",
    width: 2,
    height: 1,
    color: "#2f9e44",
    radius: 4,
  },
];

export const getFloorItemTemplateById = (
  templateId: FloorItemTemplateId,
): FloorItemTemplate => {
  const template = FLOOR_ITEM_TEMPLATES.find((item) => item.id === templateId);

  if (!template) {
    throw new Error(`Unknown floor item template: ${templateId}`);
  }

  return template;
};

export const isTableFloorItem = (
  item: Pick<PlacedFloorItem, "type">,
): item is Pick<PlacedFloorItem, "type"> & { type: "TABLE" } => {
  return item.type === "TABLE";
};

export const isRotatedFloorItem = (rotation: FloorItemRotation): boolean => {
  return rotation === 90 || rotation === 270;
};

const serverToGridUnits = (value: number): number => {
  if (value <= 0) {
    return 0;
  }

  return Math.max(1, Math.round(value / CELL_SIZE));
};

const gridToServerUnits = (value: number): number => {
  return value * CELL_SIZE;
};

export const normalizeRotation = (rotation: number): FloorItemRotation => {
  const normalized = ((rotation % 360) + 360) % 360;

  if (normalized === 90 || normalized === 180 || normalized === 270) {
    return normalized;
  }

  return 0;
};

export const getTemplateIdFromFloorItemDto = (
  item: FloorItemDto,
): FloorItemTemplateId => {
  if (item.type === "TABLE") {
    return item.tableType ?? "TWO";
  }

  return item.type;
};

export const mapFloorItemDtoToPlacedItem = (
  item: FloorItemDto,
  clientId: string,
): PlacedFloorItem => {
  const templateId = getTemplateIdFromFloorItemDto(item);
  const template = getFloorItemTemplateById(templateId);

  return {
    clientId,
    id: item.id,
    tableId: item.tableId,
    type: item.type,
    templateId,
    label: template.label,
    shortLabel: template.shortLabel,
    gridX: Math.max(0, Math.round(item.x / CELL_SIZE)),
    gridY: Math.max(0, Math.round(item.y / CELL_SIZE)),
    width: serverToGridUnits(item.width),
    height: serverToGridUnits(item.height),
    rotation: normalizeRotation(item.rotation),
    color: template.color,
    radius: template.radius,
    number: item.number ?? null,
    tableType: item.tableType,
  };
};

export const mapPlacedItemToSyncDto = (
  item: PlacedFloorItem,
): SyncFloorItemDto => {
  return {
    ...(item.id != null ? { id: item.id } : {}),
    type: item.type,
    x: gridToServerUnits(item.gridX),
    y: gridToServerUnits(item.gridY),
    width: gridToServerUnits(item.width),
    height: gridToServerUnits(item.height),
    rotation: item.rotation,
    ...(item.type === "TABLE"
      ? {
          ...(item.tableId != null ? { tableId: item.tableId } : {}),
          ...(item.number != null ? { number: item.number } : {}),
          tableType: item.tableType ?? (item.templateId as TableType),
        }
      : {}),
  };
};
