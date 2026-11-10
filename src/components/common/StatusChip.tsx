import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { statusOptions } from "../../lib/constants";

type Props = {
  /** A StatusType value, e.g. "available" */
  status: string;
};

/** Colour marker + status name. Unknown statuses fall back to plain text. */
export const StatusChip = ({ status }: Props) => {
  const { t } = useTranslation();
  const option = statusOptions.find((s) => s.value === status);

  if (!option) return <>{status}</>;

  return (
    <Box component="span" display="inline-flex" alignItems="center" gap={1} fontWeight={500} whiteSpace="nowrap">
      <Box
        component="span"
        aria-hidden
        sx={(theme) => ({
          width: 8,
          height: 8,
          borderRadius: "2px",
          backgroundColor: theme.tokens.color.status[option.tone],
        })}
      />
      {t(`status.${option.value}`, { defaultValue: option.title })}
    </Box>
  );
};
