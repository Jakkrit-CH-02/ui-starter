import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  /** Renders the title in the error colour */
  isError?: boolean;
  /** Button or link shown under the text */
  action?: ReactNode;
};

/** Centered message for empty and error states. */
export const EmptyState = ({ title, description, isError, action }: Props) => (
  <Box
    role={isError ? "alert" : undefined}
    display="flex"
    flexDirection="column"
    alignItems="center"
    textAlign="center"
    px={3}
    py={8}
  >
    <Typography variant="h3" color={isError ? "error" : "text.primary"}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" mt={0.5} maxWidth={360}>
        {description}
      </Typography>
    )}
    {action && <Box mt={3}>{action}</Box>}
  </Box>
);
