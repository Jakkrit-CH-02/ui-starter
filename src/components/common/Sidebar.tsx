import { Box, Drawer, type SxProps, type Theme } from "@mui/material";
import { BrandLink } from "./BrandLink";
import { SidebarMenu } from "./SidebarMenu";

type Props = {
  open: boolean;
  /** Mobile: overlay drawer. Desktop: full-height panel beside the page. */
  isMobile: boolean;
  onClose: () => void;
};

const paperSx: SxProps<Theme> = (theme) => ({
  width: theme.tokens.layout.sidebarWidth,
  boxSizing: "border-box",
  border: 0,
  backgroundColor: theme.tokens.color.petrol[900],
  color: theme.tokens.color.onDark.primary,
  // Focus ring that stays visible on the dark surface
  "& :focus-visible": { outlineColor: theme.tokens.color.brass[500] },
});

export const Sidebar = ({ open, isMobile, onClose }: Props) => {
  const closeOnMobile = isMobile ? onClose : undefined;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: paperSx } }}
    >
      <Box
        display="flex"
        alignItems="center"
        px={3}
        sx={(theme) => ({ minHeight: theme.tokens.layout.headerHeight })}
      >
        <BrandLink onClick={closeOnMobile} />
      </Box>
      <SidebarMenu onNavigate={closeOnMobile} />
    </Drawer>
  );
};
