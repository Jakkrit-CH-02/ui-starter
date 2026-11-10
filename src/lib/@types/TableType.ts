export enum DataType {
  Text,
  Component,
  Action,
  Status,
}

export type Column = {
  /** Key of the row object this column reads */
  id: string;
  label?: string;
  dataType: DataType;
  minWidth?: number;
  align?: "right" | "left" | "center";
  /** Formats numeric values of a Text column */
  format?: (value: number) => string;
  /** Cut long text with an ellipsis (needs minWidth) */
  truncate?: boolean;
};

export type PagingState = {
  keyword?: string;
  limit: number;
  page: number;
  offset: number;
};

export type TableState<T> = {
  rows: T[];
  total: number;
};

export type Order = "asc" | "desc";
