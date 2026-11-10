import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box, ButtonBase, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { MenuGroups } from "../../lib/constants";

type Props = {
  /** Called after a menu item is chosen, e.g. to close the mobile drawer */
  onNavigate?: () => void;
};

const isActive = (pathname: string, path: string) => pathname === path || pathname.startsWith(`${path}/`);

/** Grouped navigation shown inside the sidebar, on desktop and mobile. */
export const SidebarMenu = ({ onNavigate }: Props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <Box component="nav" aria-label={t("sidebar.main")} px={2} py={1.5}>
      {MenuGroups.filter((group) => group.menuList.length > 0).map((group) => {
        const isOpen = !collapsed[group.name];
        const listId = `sidebar-group-${group.name}`;
        return (
          <Box key={group.name} mb={2}>
            <ButtonBase
              onClick={() => setCollapsed((state) => ({ ...state, [group.name]: isOpen }))}
              aria-expanded={isOpen}
              aria-controls={listId}
              sx={(theme) => ({
                width: "100%",
                minHeight: 36,
                px: 1.5,
                justifyContent: "space-between",
                borderRadius: `${theme.tokens.radius.sm}px`,
                color: theme.tokens.color.onDark.secondary,
                typography: "caption",
                "&:hover": { backgroundColor: theme.tokens.color.onDark.hover },
              })}
            >
              {t(`sidebar.${group.name}`, { defaultValue: group.groupName })}
              <ExpandMoreRoundedIcon
                fontSize="small"
                sx={{ transform: isOpen ? "none" : "rotate(-90deg)", transition: "transform 150ms" }}
              />
            </ButtonBase>
            <Collapse in={isOpen} timeout="auto">
              <List id={listId} disablePadding>
                {group.menuList.map((menu) => {
                  const selected = isActive(pathname, menu.pathName);
                  return (
                    <ListItemButton
                      key={menu.name}
                      component={Link}
                      to={menu.pathName}
                      selected={selected}
                      aria-current={selected ? "page" : undefined}
                      onClick={onNavigate}
                      sx={(theme) => {
                        const { onDark } = theme.tokens.color;
                        return {
                          minHeight: 44,
                          mt: 0.5,
                          px: 1.5,
                          borderRadius: `${theme.tokens.radius.md}px`,
                          color: onDark.muted,
                          "&:hover": { backgroundColor: onDark.hover, color: onDark.primary },
                          "&.Mui-selected, &.Mui-selected:hover": {
                            backgroundColor: onDark.selected,
                            color: theme.palette.common.white,
                          },
                        };
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 30, color: "inherit" }}>
                        <menu.icon sx={{ fontSize: 18 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={t(`sidebar.${menu.name}`, { defaultValue: menu.text })}
                        slotProps={{ primary: { variant: "body2", fontWeight: selected ? 600 : 400 } }}
                      />
                      {selected && (
                        <Box
                          aria-hidden
                          sx={(theme) => ({
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: theme.tokens.color.brass[500],
                          })}
                        />
                      )}
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );
};
