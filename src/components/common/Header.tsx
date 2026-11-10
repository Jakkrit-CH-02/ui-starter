import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BrandLink } from "./BrandLink";
import { Breadcrumb } from "./Breadcrumb";

type Props = {
  isMobile: boolean;
  /** Space reserved on the left for the open desktop sidebar, in px */
  offset?: number;
  /** Hidden when the page has no sidebar */
  showMenuButton?: boolean;
  isMenuOpen?: boolean;
  onToggleMenu?: () => void;
};

/**
 * Top bar. Desktop: light bar beside the sidebar with the menu toggle and
 * breadcrumb. Mobile: dark bar with the brand, since the sidebar is hidden.
 */
export const Header = ({ isMobile, offset = 0, showMenuButton = true, isMenuOpen, onToggleMenu }: Props) => {
  const { t } = useTranslation();

  const menuButton = showMenuButton && (
    <IconButton
      edge={isMobile ? "end" : "start"}
      color="inherit"
      onClick={onToggleMenu}
      aria-label={t(isMobile ? "header.openMenu" : "header.toggleMenu")}
      aria-expanded={isMenuOpen}
      sx={{ width: 44, height: 44 }}
    >
      <MenuRoundedIcon />
    </IconButton>
  );

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={(theme) => {
        const { petrol, onDark, brass } = theme.tokens.color;
        return {
          left: offset,
          width: `calc(100% - ${offset}px)`,
          borderBottom: 1,
          borderColor: isMobile ? petrol[900] : "divider",
          backgroundColor: isMobile ? petrol[900] : "background.paper",
          color: isMobile ? onDark.primary : "text.secondary",
          transition: theme.transitions.create(["left", "width"], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(isMobile && { "& :focus-visible": { outlineColor: brass[500] } }),
        };
      }}
    >
      <Toolbar
        sx={(theme) => ({
          minHeight: `${theme.tokens.layout.headerHeight}px !important`,
          gap: 1,
          px: { xs: 2, md: 3, lg: 4 },
          justifyContent: isMobile ? "space-between" : "flex-start",
        })}
      >
        {isMobile ? (
          <>
            <BrandLink />
            {menuButton}
          </>
        ) : (
          <>
            {menuButton}
            <Breadcrumb />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
