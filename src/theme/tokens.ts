/**
 * Design tokens — the single source of truth for colour, type, radius and
 * layout sizes. Documented in /design-tokens.md. Components read these through
 * the MUI theme (`theme.palette`, `theme.tokens`) instead of hardcoding values.
 */
export const tokens = {
  color: {
    petrol: {
      900: "#0C2A2E",
      700: "#0F3A40",
      500: "#2C5A60",
      50: "#E7EEEE",
    },
    brass: {
      500: "#B08D57",
      700: "#7A5C2E",
    },
    canvas: "#F5F6F4",
    paper: "#FFFFFF",
    line: "#E2E5E1",
    lineSoft: "#EEF0ED",
    lineStrong: "#D5DAD5",
    text: {
      primary: "#172124",
      secondary: "#566366",
      disabled: "#9AA5A6",
    },
    onDark: {
      primary: "#E9EFEE",
      secondary: "#9DB1B1",
      muted: "#C9D6D5",
      hover: "rgba(255, 255, 255, 0.05)",
      selected: "rgba(255, 255, 255, 0.08)",
    },
    success: { main: "#1F7A4D", soft: "#E4F2EA" },
    warning: { main: "#9A5B00", soft: "#FBEFD9" },
    error: { main: "#B3261E", soft: "#FBE9E7" },
    info: { main: "#1F5F8B", soft: "#E3EEF6" },
    /** Data colours. They differ in lightness as well as hue; always pair with a label. */
    status: {
      occupied: "#0F3A40",
      available: "#8FC7A6",
      reserved: "#B08D57",
      maintenance: "#7C5CD6",
      expired: "#E39A4F",
      terminated: "#8A2A22",
    },
  },
  font: {
    family: '"Anuphan Variable", "Anuphan", system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  radius: { sm: 6, md: 8, lg: 16, xl: 20, pill: 999 },
  shadow: {
    overlay: "0 12px 32px -8px rgba(12, 42, 46, 0.18)",
  },
  layout: {
    headerHeight: 64,
    sidebarWidth: 264,
    contentMaxWidth: 1200,
  },
} as const;

export type Tokens = typeof tokens;
export type StatusTone = keyof Tokens["color"]["status"];
