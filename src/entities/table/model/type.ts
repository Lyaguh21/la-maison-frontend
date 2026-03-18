export type TableType = "TWO" | "FOUR" | "SIX";
export interface ITable {
  id: number;
  number: number;
  type: TableType;
  createdAt: string;
  updatedAt: string;
}

export const TableSeats = {
  TWO: "2",
  FOUR: "4",
  SIX: "6",
};
