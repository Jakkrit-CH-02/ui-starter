import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { Header } from "../common/Header";
import { Sidebar } from "../common/Sidebar";

type Props = {
  /** Set to false for pages without navigation, e.g. a login page */
  isShowSidebar?: boolean;
};

/** App shell: fixed header, collapsible sidebar and the routed page. */
export const Layout = ({ isShowSidebar = true }: Props) => {
  const theme = useTheme();
  const { isMobile } = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  // Desktop starts open, mobile starts closed — also when the window crosses the breakpoint.
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const hasDesktopSidebar = isShowSidebar && !isMobile && isSidebarOpen;
  const sidebarWidth = theme.tokens.layout.sidebarWidth;

  return (
    <Box minHeight="100vh">
      <Header
        isMobile={isMobile}
        offset={hasDesktopSidebar ? sidebarWidth : 0}
        showMenuButton={isShowSidebar}
        isMenuOpen={isSidebarOpen}
        onToggleMenu={() => setIsSidebarOpen((open) => !open)}
      />
      {isShowSidebar && (
        <Sidebar open={isSidebarOpen} isMobile={isMobile} onClose={() => setIsSidebarOpen(false)} />
      )}
      <Box
        component="main"
        sx={{
          pt: `${theme.tokens.layout.headerHeight}px`,
          ml: hasDesktopSidebar ? `${sidebarWidth}px` : 0,
          transition: theme.transitions.create("margin-left", {
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Box
          sx={{
            maxWidth: theme.tokens.layout.contentMaxWidth,
            px: { xs: 2, md: 3, lg: 5 },
            pt: { xs: 3, lg: 5 },
            pb: 7,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
