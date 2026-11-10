import { Box, Pagination as MuiPagination, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getPageRange } from "../../lib/utils/pagination";

type Props = {
  /** Index of the first item on the current page (0-based) */
  offset?: number;
  /** Items per page */
  limit?: number;
  total?: number;
  /** Called with the new page number (1-based) */
  onPagination?: (page: number) => void;
};

export const Pagination = ({ offset = 0, limit = 10, total = 0, onPagination }: Props) => {
  const { t } = useTranslation();
  const { start, end } = getPageRange({ offset, limit, total });
  const count = Math.max(1, Math.ceil(total / limit));
  const page = Math.floor(offset / limit) + 1;

  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="space-between" gap={1.5}>
      <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
        {t("table.showing", { start, end, total })}
      </Typography>
      <MuiPagination
        count={count}
        page={page}
        color="primary"
        variant="outlined"
        shape="rounded"
        onChange={(_e, value) => {
          if (value !== page) onPagination?.(value);
        }}
      />
    </Box>
  );
};
