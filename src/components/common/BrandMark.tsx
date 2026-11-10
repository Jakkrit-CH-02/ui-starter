import { useTheme } from "@mui/material";

type Props = {
  /** Width and height in px */
  size?: number;
};

/** App logo for dark surfaces: a brass outline with a light core. */
export const BrandMark = ({ size = 32 }: Props) => {
  const { tokens } = useTheme();

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4l12 12-12 12L4 16 16 4z" stroke={tokens.color.brass[500]} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 11l5 5-5 5-5-5 5-5z" fill={tokens.color.onDark.primary} />
    </svg>
  );
};
