import { Box, Typography } from "@mui/material";
import { useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FilterChips, type FilterOption } from "../components/common/FilterChips";
import { PageHeader } from "../components/common/PageHeader";
import { SearchField } from "../components/common/SearchField";
import { Table } from "../components/common/Table";
import { useModal } from "../components/contexts/ModalContext";
import { DataType, type Column } from "../lib/@types";
import { ActionTable, statusOptions, type StatusType } from "../lib/constants";
import { useDebounce } from "../lib/hooks/useDebounce";
import { useWindowSize } from "../lib/hooks/useWindowSize";
import { OccupancySummary } from "./OccupancySummary";
import { sampleUnits, type Unit } from "./sampleUnits";
import { TenantCell } from "./TenantCell";
import { UnitList } from "./UnitList";

const PAGE_SIZE = 6;
const ROW_ACTIONS = [ActionTable.VIEW, ActionTable.EDIT, ActionTable.DELETE];

type StatusFilter = "all" | StatusType;
type UnitRow = Unit & { tenantCell: ReactNode; actions: ActionTable[] };

/**
 * Sample page: shows how the summary, filters, Table, Pagination and the
 * confirm dialog fit together. The data lives in memory — replace it with a
 * query to your API.
 */
export const OverviewPage = () => {
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();
  const { displayConfirmDeleteModal, handleClose } = useModal();
  const [units, setUnits] = useState<Unit[]>(sampleUnits);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { value: keyword, setValue: setKeyword } = useDebounce({ value: "", delay: 250 });

  const filterOptions = useMemo<FilterOption<StatusFilter>[]>(
    () => [
      { value: "all", label: t("overview.all"), count: units.length },
      ...statusOptions
        .map((option) => ({
          value: option.value,
          label: t(`status.${option.value}`, { defaultValue: option.title }),
          count: units.filter((unit) => unit.status === option.value).length,
        }))
        .filter((option) => option.count > 0),
    ],
    [units, t]
  );

  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    return units.filter(
      (unit) =>
        (status === "all" || unit.status === status) &&
        (!needle || unit.name.toLowerCase().includes(needle) || unit.tenant.toLowerCase().includes(needle))
    );
  }, [units, status, keyword]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const offset = (currentPage - 1) * PAGE_SIZE;
  const pageUnits = filtered.slice(offset, offset + PAGE_SIZE);

  const columns = useMemo<Column[]>(
    () => [
      { id: "name", label: t("overview.columns.unit"), dataType: DataType.Text, minWidth: 96 },
      { id: "tenantCell", label: t("overview.columns.tenant"), dataType: DataType.Component, minWidth: 200 },
      {
        id: "rent",
        label: t("overview.columns.rent"),
        dataType: DataType.Text,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
      },
      { id: "status", label: t("overview.columns.status"), dataType: DataType.Status },
      { id: "actions", label: t("overview.columns.actions"), dataType: DataType.Action, align: "right" },
    ],
    [t]
  );

  const rows = useMemo<UnitRow[]>(
    () => pageUnits.map((unit) => ({ ...unit, tenantCell: <TenantCell name={unit.tenant} />, actions: ROW_ACTIONS })),
    [pageUnits]
  );

  const confirmRemove = (unit: Unit) => {
    displayConfirmDeleteModal<Unit>(
      (target) => {
        setUnits((list) => list.filter((item) => item.id !== target?.id));
        handleClose();
      },
      unit.name,
      unit,
      t("overview.removeUnitTitle")
    );
  };

  // With no units at all the list shows its default "nothing here yet" text.
  const isFiltering = units.length > 0;
  const emptyTitle = isFiltering ? t("overview.noMatchTitle") : t("table.emptyTitle");
  const emptyDescription = isFiltering ? t("overview.noMatchDescription") : t("table.emptyDescription");

  return (
    <>
      <PageHeader title={t("overview.title")} description={t("overview.description", { count: units.length })} />

      <OccupancySummary units={units} />

      <Box component="section" aria-label={t("overview.units")} mt={4}>
        <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5} mb={2}>
          <Typography variant="h2">{t("overview.units")}</Typography>
          <SearchField
            value={search}
            placeholder={t("overview.searchPlaceholder")}
            onChange={(value) => {
              setSearch(value);
              setKeyword(value);
              setPage(1);
            }}
          />
        </Box>
        <Box mb={2}>
          <FilterChips
            label={t("overview.filterLabel")}
            options={filterOptions}
            value={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          />
        </Box>

        {isMobile ? (
          <UnitList
            units={pageUnits}
            offset={offset}
            limit={PAGE_SIZE}
            total={filtered.length}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            onPagination={setPage}
            onRemove={confirmRemove}
          />
        ) : (
          <Table<UnitRow>
            columns={columns}
            rows={rows}
            emptyTitle={emptyTitle}
            emptyDescription={emptyDescription}
            offset={offset}
            limit={PAGE_SIZE}
            total={filtered.length}
            onPagination={setPage}
            onClickAction={(row, action) => {
              if (action === ActionTable.DELETE) confirmRemove(row);
            }}
          />
        )}
      </Box>
    </>
  );
};
