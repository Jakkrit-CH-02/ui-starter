import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import type { MenuGroupType } from "../@types";

/** Sidebar menu. Each path needs a matching route in src/routes/router.tsx. */
export const MenuGroups: MenuGroupType[] = [
  {
    name: "dashboard",
    groupName: "Dashboard",
    menuList: [
      {
        name: "overview",
        pathName: "/dashboard/overview",
        text: "Overview",
        icon: SpaceDashboardRoundedIcon,
      },
      {
        name: "analytics",
        pathName: "/dashboard/analytics",
        text: "Analytics",
        icon: EqualizerRoundedIcon,
      },
    ],
  },
];
