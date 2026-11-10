import {
  Box,
  Paper,
  Skeleton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { DataType, type Column } from "../../lib/@types";
import type { ActionTable } from "../../lib/constants";
import { EmptyState } from "./EmptyState";
import { OutlineButton } from "./OutlineButton";
import { Pagination } from "./Pagination";
import { StatusChip } from "./StatusChip";
import { TableActions } from "./TableActions";

const SKELETON_ROWS = 5;
const NUMBER_COLUMN_ID = "__no";
const EMPTY_VALUE = "–";
// First and last cells line up with the card's 24px inner edge.
const edgePadding = { "&:first-of-type": { pl: 3 }, "&:last-of-type": { pr: 3 } };

type Props<T extends object> = {
  columns: Column[];
  rows: T[];
  /** Unique key of a row. Defaults to `row.id`, then the row index. */
  getRowId?: (row: T, index: number) => string | number;
  /** Adds a running number as the first column */
  numbered?: boolean;
  loading?: boolean;
  /** Shows the error state instead of rows */
  error?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Pagination is shown when `total` is greater than 0 */
  offset?: number;
  limit?: number;
  total?: number;
  onPagination?: (page: number) => void;
  onClickAction?: (row: T, action: ActionTable, index: number) => void;
};

export const Table = <T extends object>({
  columns,
  rows,
  getRowId,
  numbered,
  loading,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
  offset = 0,
  limit = 10,
  total = 0,
  onPagination,
  onClickAction,
}: Props<T>) => {
  const { t } = useTranslation();

  const tableColumns = useMemo<Column[]>(
    () =>
      numbered
        ? [{ id: NUMBER_COLUMN_ID, label: t("table.number"), dataType: DataType.Text, minWidth: 56 }, ...columns]
        : columns,
    [numbered, columns, t]
  );

  const rowId = (row: T, index: number) => {
    if (getRowId) return getRowId(row, index);
    const id = (row as { id?: unknown }).id;
    return typeof id === "string" || typeof id === "number" ? id : index;
  };

  const renderCell = (row: T, index: number, column: Column): ReactNode => {
    if (column.id === NUMBER_COLUMN_ID) return offset + index + 1;

    const value = (row as Record<string, unknown>)[column.id];
    if (value === null || value === undefined || value === "") return EMPTY_VALUE;

    switch (column.dataType) {
      case DataType.Status:
        return <StatusChip status={String(value)} />;
      case DataType.Component:
        return value as ReactNode;
      case DataType.Action:
        return (
          <TableActions
            actions={value as ActionTable[]}
            onAction={(action) => onClickAction?.(row, action, index)}
          />
        );
      case DataType.Text:
      default: {
        const text = typeof value === "number" && column.format ? column.format(value) : String(value);
        return column.truncate && column.minWidth ? (
          <Typography variant="body2" noWrap title={text} sx={{ maxWidth: column.minWidth }}>
            {text}
          </Typography>
        ) : (
          text
        );
      }
    }
  };

  const showRows = !loading && !error && rows.length > 0;

  return (
    <Paper variant="outlined" sx={(theme) => ({ borderRadius: `${theme.tokens.radius.lg}px`, overflow: "hidden" })}>
      <TableContainer>
        <MuiTable aria-busy={loading}>
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth, ...edgePadding }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              Array.from({ length: SKELETON_ROWS }, (_, i) => (
                <TableRow key={i}>
                  {tableColumns.map((column) => (
                    <TableCell key={column.id} sx={edgePadding}>
                      <Skeleton variant="text" width="70%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {showRows &&
              rows.map((row, index) => (
                <TableRow key={rowId(row, index)} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  {tableColumns.map((column) => (
                    <TableCell key={column.id} align={column.align} sx={edgePadding}>
                      {renderCell(row, index, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {!loading && error && (
        <EmptyState
          isError
          title={t("table.errorTitle")}
          description={t("table.errorDescription")}
          action={onRetry && <OutlineButton onClick={onRetry}>{t("common.tryAgain")}</OutlineButton>}
        />
      )}
      {!loading && !error && rows.length === 0 && (
        <EmptyState
          title={emptyTitle ?? t("table.emptyTitle")}
          description={emptyDescription ?? t("table.emptyDescription")}
        />
      )}
      {showRows && total > 0 && (
        <Box px={3} py={1.5} borderTop={1} borderColor="divider">
          <Pagination offset={offset} limit={limit} total={total} onPagination={onPagination} />
        </Box>
      )}
    </Paper>
  );
};

export default Table;
