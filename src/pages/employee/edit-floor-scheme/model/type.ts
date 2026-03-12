export interface TableTemplate {
  id: string;
  label: string;
  width: number; // в клетках
  height: number; // в клетках
  color: string;
}

export interface PlacedTable {
  id: string;
  templateId: string;
  label: string;
  gridX: number;
  gridY: number;
  width: number;
  height: number;
  rotation: 0 | 90 | 180 | 270;
  color: string;
  number: number | null;
  photo: string | null;
}

export const CELL_SIZE = 48;
export const GRID_COLS = 20;
export const GRID_ROWS = 14;

export const TABLE_TEMPLATES: TableTemplate[] = [
  { id: "tpl-2x2", label: "2×2", width: 2, height: 2, color: "#4c6ef5" },
  { id: "tpl-2x3", label: "2×3", width: 2, height: 3, color: "#40c057" },
  { id: "tpl-3x3", label: "3×3", width: 3, height: 3, color: "#fab005" },
];
