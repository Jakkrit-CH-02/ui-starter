import type { SvgIconComponent } from "@mui/icons-material";

export type MenuType = {
  /** i18n key suffix: `sidebar.<name>` */
  name: string;
  pathName: string;
  /** Fallback label when no translation exists */
  text: string;
  icon: SvgIconComponent;
};

export type MenuGroupType = {
  /** i18n key suffix: `sidebar.<name>` */
  name: string;
  /** Fallback label when no translation exists */
  groupName: string;
  menuList: MenuType[];
};
