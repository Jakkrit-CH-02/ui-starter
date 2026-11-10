import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MenuGroups } from "../../lib/constants";

/** "Group › Page" for the current route, read from the sidebar menu. */
export const Breadcrumb = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  for (const group of MenuGroups) {
    const menu = group.menuList.find((m) => pathname === m.pathName || pathname.startsWith(`${m.pathName}/`));
    if (!menu) continue;
    return (
      <Box component="nav" aria-label={t("header.breadcrumb")} display="flex" alignItems="center" gap={0.75} minWidth={0}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {t(`sidebar.${group.name}`, { defaultValue: group.groupName })}
        </Typography>
        <ChevronRightRoundedIcon aria-hidden sx={{ fontSize: 16, color: "text.secondary" }} />
        <Typography variant="subtitle2" aria-current="page" noWrap>
          {t(`sidebar.${menu.name}`, { defaultValue: menu.text })}
        </Typography>
      </Box>
    );
  }
  return null;
};
