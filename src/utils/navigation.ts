import { LayoutDashboard, BarChart3, TrendingUp, User } from "lucide-react";
import type { NavItem } from "../components/layout/Sidebar";

export const defaultNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Главная",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "trading",
    label: "Торговля",
    icon: TrendingUp,
    path: "/trading",
  },
  {
    id: "analytics",
    label: "Аналитика",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    id: "profile",
    label: "Профиль",
    icon: User,
    path: "/profile",
  },
];
