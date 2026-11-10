import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { memo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  footer?: ReactNode;
  /** Max width in px */
  width?: number;
  /** Marks the dialog with a warning-coloured top edge */
  isWarning?: boolean;
  keepMounted?: boolean;
};

export const AppDialog = memo(({ title, open, onClose, children, footer, width, isWarning, keepMounted }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      keepMounted={keepMounted}
      slotProps={{
        paper: {
          sx: {
            maxWidth: width,
            borderTop: isWarning ? 3 : 0,
            borderColor: "warning.main",
          },
        },
      }}
    >
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} pl={3} pr={1.5} pt={2}>
        <DialogTitle variant="h2" sx={{ p: 0, pt: 0.5 }}>
          {title}
        </DialogTitle>
        <IconButton onClick={onClose} aria-label={t("common.close")}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      {children && <DialogContent sx={{ px: 3, pt: 1.5, pb: 3 }}>{children}</DialogContent>}
      {footer && <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>{footer}</DialogActions>}
    </Dialog>
  );
});
