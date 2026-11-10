import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

/** Tenant name with an initials badge, or "No tenant" for a vacant unit. */
export const TenantCell = ({ name }: Props) => {
  const { t } = useTranslation();

  if (!name) {
    return (
      <Typography variant="body2" color="text.secondary">
        {t("overview.noTenant")}
      </Typography>
    );
  }

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Box
        aria-hidden
        sx={(theme) => ({
          flex: "none",
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          backgroundColor: theme.tokens.color.petrol[50],
          color: "primary.main",
          fontSize: 11,
          fontWeight: 600,
        })}
      >
        {initialsOf(name)}
      </Box>
      <Typography variant="body2">{name}</Typography>
    </Box>
  );
};
