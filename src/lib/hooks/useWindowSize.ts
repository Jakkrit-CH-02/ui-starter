import { useLayoutEffect, useState } from "react";
import { theme } from "../../theme";

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  // Below the `lg` breakpoint the sidebar becomes an overlay drawer.
  isMobile: window.innerWidth < theme.breakpoints.values.lg,
});

export const useWindowSize = () => {
  const [size, setSize] = useState(getSize);

  useLayoutEffect(() => {
    const updateSize = () => setSize(getSize());
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
