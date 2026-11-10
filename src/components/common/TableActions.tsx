import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ActionTable } from "../../lib/constants";
import { OutlineButton } from "./OutlineButton";
import { PrimaryButton } from "./PrimaryButton";

type Props = {
  actions: ActionTable[];
  onAction: (action: ActionTable) => void;
};

/** Action buttons of one table row. */
export const TableActions = ({ actions, onAction }: Props) => {
  const { t } = useTranslation();

  const iconAction = (action: ActionTable, label: string, icon: ReactNode) => (
    <Tooltip key={action} title={label}>
      <IconButton
        size="small"
        aria-label={label}
        onClick={() => onAction(action)}
        // 44px touch target on touch screens
        sx={{ "@media (pointer: coarse)": { width: 44, height: 44 } }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  const render = (action: ActionTable) => {
    switch (action) {
      case ActionTable.VIEW:
        return iconAction(action, t("table.view"), <VisibilityOutlinedIcon fontSize="small" />);
      case ActionTable.EDIT:
        return iconAction(action, t("table.edit"), <EditOutlinedIcon fontSize="small" />);
      case ActionTable.DELETE:
        return iconAction(action, t("table.remove"), <DeleteOutlineRoundedIcon fontSize="small" />);
      case ActionTable.BUTTON_DELETE:
        return (
          <PrimaryButton key={action} dataCy={action} color="error" size="small" onClick={() => onAction(action)}>
            {t("table.remove")}
          </PrimaryButton>
        );
      case ActionTable.REVIEW:
        return (
          <OutlineButton key={action} dataCy={action} color="inherit" size="small" onClick={() => onAction(action)}>
            {t("table.review")}
          </OutlineButton>
        );
      default:
        return null;
    }
  };

  return (
    <Box display="inline-flex" alignItems="center" gap={0.5}>
      {actions.map(render)}
    </Box>
  );
};
