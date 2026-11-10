import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { EmptyState } from "../components/common/EmptyState";
import { PageHeader } from "../components/common/PageHeader";

export const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t("analytics.title")} />
      <Paper variant="outlined" sx={(theme) => ({ borderRadius: `${theme.tokens.radius.lg}px` })}>
        <EmptyState title={t("analytics.emptyTitle")} description={t("analytics.emptyDescription")} />
      </Paper>
    </>
  );
};
