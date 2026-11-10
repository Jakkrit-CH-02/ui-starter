type Props = {
  path: string;
  /** Width and height in px */
  size?: number;
  /** Leave empty for decorative images */
  alt?: string;
};

export const IconImage = ({ path, size = 18, alt = "" }: Props) => (
  <img src={path} width={size} height={size} alt={alt} style={{ display: "block" }} />
);
