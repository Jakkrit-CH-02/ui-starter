import { createTheme, type Shadows } from "@mui/material/styles";
import { tokens, type Tokens } from "./tokens";

declare module "@mui/material/styles" {
  interface Theme {
    tokens: Tokens;
  }
  interface ThemeOptions {
    tokens?: Tokens;
  }
}

const { color, font, radius, shadow } = tokens;

// Resting surfaces are flat (1px border); only overlays cast a shadow.
const shadows = ["none", ...Array<string>(24).fill(shadow.overlay)] as Shadows;

export const theme = createTheme({
  tokens,
  palette: {
    mode: "light",
    primary: {
      main: color.petrol[700],
      light: color.petrol[500],
      dark: color.petrol[900],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: color.brass[700],
      light: color.brass[500],
      contrastText: "#FFFFFF",
    },
    success: { main: color.success.main },
    warning: { main: color.warning.main, contrastText: "#FFFFFF" },
    error: { main: color.error.main },
    info: { main: color.info.main },
    background: { default: color.canvas, paper: color.paper },
    text: color.text,
    divider: color.line,
    action: {
      hover: color.canvas,
      selected: color.petrol[50],
    },
  },
  shape: { borderRadius: radius.md },
  shadows,
  typography: {
    fontFamily: font.family,
    h1: { fontSize: 32, lineHeight: 40 / 32, fontWeight: 600, letterSpacing: "-0.02em" },
    h2: { fontSize: 20, lineHeight: 28 / 20, fontWeight: 600, letterSpacing: "-0.01em" },
    h3: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 600 },
    h4: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 600 },
    h5: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 600 },
    h6: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 600 },
    subtitle1: { fontSize: 16, lineHeight: 24 / 16, fontWeight: 500 },
    subtitle2: { fontSize: 14, lineHeight: 22 / 14, fontWeight: 500 },
    body1: { fontSize: 16, lineHeight: 24 / 16 },
    body2: { fontSize: 14, lineHeight: 22 / 14 },
    caption: { fontSize: 12, lineHeight: 18 / 12, fontWeight: 500 },
    button: { fontSize: 14, lineHeight: 22 / 14, fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: color.canvas },
        ":focus-visible": {
          outline: `2px solid ${color.petrol[700]}`,
          outlineOffset: 2,
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            transitionDuration: "0.01ms !important",
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: radius.md, minHeight: 36, paddingInline: 16 },
        sizeSmall: { minHeight: 32, paddingInline: 12 },
        containedPrimary: { "&:hover": { backgroundColor: color.petrol[500] } },
        outlined: { borderColor: color.lineStrong },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: radius.md } },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundImage: "none" } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: radius.xl, boxShadow: shadow.overlay },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottomColor: color.lineSoft, padding: "14px 16px", fontSize: 14 },
        head: {
          backgroundColor: color.paper,
          borderBottomColor: color.line,
          color: color.text.secondary,
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 18 / 12,
          whiteSpace: "nowrap",
        },
        body: { fontVariantNumeric: "tabular-nums" },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: { borderRadius: radius.sm, borderColor: color.line },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: color.petrol[900], fontSize: 12, fontWeight: 500 },
      },
    },
    MuiSkeleton: {
      defaultProps: { animation: "wave" },
    },
  },
});
