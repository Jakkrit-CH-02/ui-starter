import { Box, Typography } from "@mui/material";
import type { ButtonColor } from "../contexts/ModalContext";
import { OutlineButton } from "./OutlineButton";
import { PrimaryButton } from "./PrimaryButton";

type Props<T> = {
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonColor?: ButtonColor;
  data?: T;
  onCancel: () => void;
  onConfirm?: (data?: T) => void;
};

/** Body of a confirm dialog: a question and Cancel / Confirm buttons. */
export const ConfirmContent = <T,>({
  description,
  confirmButtonText,
  cancelButtonText,
  confirmButtonColor = "primary",
  data,
  onCancel,
  onConfirm,
}: Props<T>) => (
  <Box>
    <Typography color="text.secondary">{description}</Typography>
    <Box display="flex" justifyContent="flex-end" gap={1.5} mt={4}>
      <OutlineButton color="inherit" onClick={onCancel}>
        {cancelButtonText}
      </OutlineButton>
      <PrimaryButton color={confirmButtonColor} onClick={() => onConfirm?.(data)}>
        {confirmButtonText}
      </PrimaryButton>
    </Box>
  </Box>
);
