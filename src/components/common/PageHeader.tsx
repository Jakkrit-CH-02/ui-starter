import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  /** Buttons shown on the right */
  actions?: ReactNode;
};

export const PageHeader = ({ title, description, actions }: Props) => (
  <Box display="flex" flexWrap="wrap" alignItems="flex-end" justifyContent="space-between" gap={2} mb={4}>
    <Box>
      <Typography variant="h1">{title}</Typography>
      {description && (
        <Typography color="text.secondary" mt={0.75}>
          {description}
        </Typography>
      )}
    </Box>
    {actions}
  </Box>
);
