import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { routes } from '@/config/routes';

const Layout = () => {
  const location = useLocation();
  const visibleRoutes = routes.filter(route => !route.hidden);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 bg-white border-t border-surface px-4 py-2 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {visibleRoutes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <NavLink
                key={route.id}
                to={route.path}
                className="flex flex-col items-center py-2 px-3 min-w-0"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center ${
                    isActive ? 'text-secondary' : 'text-gray-600'
                  }`}
                >
                  <ApperIcon
                    name={route.icon}
                    size={24}
                    className={`mb-1 ${isActive ? 'text-secondary' : 'text-gray-600'}`}
                  />
                  <span className={`text-xs font-medium ${
                    isActive ? 'text-secondary' : 'text-gray-600'
                  }`}>
                    {route.label}
                  </span>
                </motion.div>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;