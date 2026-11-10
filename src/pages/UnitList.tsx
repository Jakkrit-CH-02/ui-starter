import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../components/common/EmptyState";
import { Pagination } from "../components/common/Pagination";
import { StatusChip } from "../components/common/StatusChip";
import type { Unit } from "./sampleUnits";

type Props = {
  units: Unit[];
  offset: number;
  limit: number;
  total: number;
  emptyTitle: string;
  emptyDescription: string;
  onPagination: (page: number) => void;
  onRemove: (unit: Unit) => void;
};

/** Phone layout of the units table: one stacked row per unit. */
export const UnitList = ({ units, offset, limit, total, emptyTitle, emptyDescription, onPagination, onRemove }: Props) => {
  const { t } = useTranslation();

  return (
    <Paper variant="outlined" sx={(theme) => ({ borderRadius: `${theme.tokens.radius.lg}px`, overflow: "hidden" })}>
      {units.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <Box component="ul" m={0} p={0} sx={{ listStyle: "none" }}>
            {units.map((unit) => (
              <Box
                component="li"
                key={unit.id}
                display="flex"
                alignItems="center"
                gap={1}
                minHeight={68}
                pl={2}
                pr={0.5}
                borderBottom={1}
                borderColor="divider"
              >
                <Box flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600}>
                    {unit.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {unit.tenant || t("overview.noTenant")}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                    {unit.rent.toLocaleString("en-US")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="span">
                    <StatusChip status={unit.status} />
                  </Typography>
                </Box>
                <IconButton
                  aria-label={`${t("table.remove")} ${unit.name}`}
                  onClick={() => onRemove(unit)}
                  sx={{ width: 44, height: 44 }}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Box px={2} py={1.5}>
            <Pagination offset={offset} limit={limit} total={total} onPagination={onPagination} />
          </Box>
        </>
      )}
    </Paper>
  );
};
