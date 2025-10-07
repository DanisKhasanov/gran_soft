import { LayoutDashboard, BarChart3, TrendingUp, User } from "lucide-react";
import type { NavItem } from "../components/layout/Sidebar";

export const getDefaultNavItems = (t: (key: string) => string): NavItem[] => [
  {
    id: "dashboard",
    label: t("navigation.dashboard"),
    icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "trading",
    label: t("navigation.trading"),
    icon: TrendingUp,
    path: "/trading",
  },
  {
    id: "analytics",
    label: t("navigation.analytics"),
    icon: BarChart3,
    path: "/analytics",
  },
  {
    id: "profile",
    label: t("navigation.profile"),
    icon: User,
    path: "/profile",
  },
];
