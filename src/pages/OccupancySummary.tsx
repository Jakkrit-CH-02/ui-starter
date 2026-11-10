import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { statusOptions, StatusType } from "../lib/constants";
import type { Unit } from "./sampleUnits";

type Props = {
  units: Unit[];
};

/** How many units are occupied, plus a bar and legend of all units by status. */
export const OccupancySummary = ({ units }: Props) => {
  const { t } = useTranslation();

  const segments = statusOptions
    .map((option) => ({
      ...option,
      label: t(`status.${option.value}`, { defaultValue: option.title }),
      count: units.filter((unit) => unit.status === option.value).length,
    }))
    .filter((segment) => segment.count > 0);

  const occupied = units.filter((unit) => unit.status === StatusType.OCCUPIED);
  const rent = occupied.reduce((sum, unit) => sum + unit.rent, 0);
  const barLabel = `${t("overview.byStatus")}: ${segments.map((s) => `${s.count} ${s.label}`).join(", ")}`;

  return (
    <Paper
      component="section"
      aria-label={t("overview.occupancy")}
      variant="outlined"
      sx={(theme) => ({
        display: "flex",
        flexWrap: "wrap",
        borderRadius: `${theme.tokens.radius.lg}px`,
        overflow: "hidden",
      })}
    >
      <Box
        flex="1 1 240px"
        px={{ xs: 2.5, md: 4 }}
        py={{ xs: 2.5, md: 3.5 }}
        sx={{ borderRight: { md: 1 }, borderBottom: { xs: 1, md: 0 }, borderColor: { xs: "divider", md: "divider" } }}
      >
        <Typography variant="caption" color="text.secondary">
          {t("overview.occupied")}
        </Typography>
        <Box display="flex" alignItems="baseline" gap={1}>
          <Typography
            component="span"
            sx={{ fontSize: 48, lineHeight: "56px", fontWeight: 600, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}
          >
            {occupied.length}
          </Typography>
          <Typography component="span" color="text.secondary">
            {t("overview.ofUnits", { total: units.length })}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {t("overview.rentPerMonth", { amount: rent.toLocaleString("en-US") })}
        </Typography>
      </Box>

      <Box
        flex="3 1 420px"
        minWidth={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={2.5}
        px={{ xs: 2.5, md: 4 }}
        py={{ xs: 2.5, md: 3.5 }}
      >
        <Box role="img" aria-label={barLabel} display="flex" gap="3px" height={12}>
          {segments.map((segment) => (
            <Box
              key={segment.value}
              sx={(theme) => ({
                flex: `${segment.count} 1 0`,
                borderRadius: "3px",
                backgroundColor: theme.tokens.color.status[segment.tone],
              })}
            />
          ))}
        </Box>
        <Box component="ul" display="flex" flexWrap="wrap" columnGap={3.5} rowGap={1} m={0} p={0} sx={{ listStyle: "none" }}>
          {segments.map((segment) => (
            <Box component="li" key={segment.value} display="flex" alignItems="center" gap={1}>
              <Box
                aria-hidden
                sx={(theme) => ({
                  width: 8,
                  height: 8,
                  borderRadius: "2px",
                  backgroundColor: theme.tokens.color.status[segment.tone],
                })}
              />
              <Typography variant="body2" color="text.secondary">
                {segment.label}
              </Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontVariantNumeric: "tabular-nums" }}>
                {segment.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};
