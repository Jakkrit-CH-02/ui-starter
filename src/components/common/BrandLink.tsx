import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BrandMark } from "./BrandMark";

type Props = {
  onClick?: () => void;
};

/** Logo + app name linking home. Made for dark surfaces. */
export const BrandLink = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      component={Link}
      to="/"
      onClick={onClick}
      sx={(theme) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5,
        minHeight: 44,
        color: theme.tokens.color.onDark.primary,
        textDecoration: "none",
        borderRadius: `${theme.tokens.radius.md}px`,
      })}
    >
      <BrandMark />
      <Typography variant="h3" component="span">
        {t("app.name")}
      </Typography>
    </Box>
  );
};
