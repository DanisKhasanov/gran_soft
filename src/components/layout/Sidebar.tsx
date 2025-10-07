import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import type { RootState } from "../../store";
import { closeSidebar } from "../../store/modalSlice";
import { getDefaultNavItems } from "../../utils";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const Sidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const currentNavItems = getDefaultNavItems(t);

  const handleLinkClick = () => {
    dispatch(closeSidebar());
  };

  return (
    <aside
      className={`
      fixed lg:static top-0 left-0 min-h-screen w-64 bg-white shadow-lg border-r border-gray-200 z-50
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0 lg:shadow-sm
    `}
    >
      <div className="p-6">
        <div className="flex justify-end mb-4 lg:hidden">
          <button
            onClick={() => dispatch(closeSidebar())}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={t("common.close")}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="space-y-2">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
