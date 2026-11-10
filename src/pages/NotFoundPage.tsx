import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/common/EmptyState";
import { PrimaryButton } from "../components/common/PrimaryButton";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <EmptyState
      title={t("notFound.title")}
      description={t("notFound.description")}
      action={<PrimaryButton onClick={() => navigate("/dashboard/overview")}>{t("notFound.back")}</PrimaryButton>}
    />
  );
};
