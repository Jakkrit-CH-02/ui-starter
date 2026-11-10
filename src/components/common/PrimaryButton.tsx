import { Button as MuiButton, type SxProps, type Theme } from "@mui/material";
import { memo, type MouseEvent, type PropsWithChildren, type ReactNode } from "react";
import type { ButtonColor } from "../contexts/ModalContext";

type Props = {
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  dataCy?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: ButtonColor;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
};

/** Filled button for the main action of a view. */
export const PrimaryButton = memo(
  ({ type = "button", dataCy, size = "medium", children, ...props }: PropsWithChildren<Props>) => (
    <MuiButton {...props} type={type} size={size} variant="contained" data-cy={dataCy}>
      {children}
    </MuiButton>
  )
);
