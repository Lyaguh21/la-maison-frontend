import { TableType } from "@/entities/table";

export type FloorItemType = "TABLE" | "WC" | "BAR" | "EXIT";

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
