import { Button as MuiButton, type SxProps, type Theme } from "@mui/material";
import { memo, type MouseEvent, type PropsWithChildren, type ReactNode } from "react";
import type { ButtonColor } from "../contexts/ModalContext";

type Props = {
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  dataCy?: string;
  startIcon?: ReactNode;
  color?: ButtonColor;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
};

/** Bordered button for secondary actions such as Cancel. */
export const OutlineButton = memo(({ dataCy, children, ...props }: PropsWithChildren<Props>) => (
  <MuiButton {...props} type="button" variant="outlined" data-cy={dataCy}>
    {children}
  </MuiButton>
));
