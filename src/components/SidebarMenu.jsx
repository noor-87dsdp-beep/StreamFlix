import { Link, useLocation } from 'react-router-dom';
import { Home, ListVideo, User, X, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SidebarMenu = () => {
  const location = useLocation();
  const { isMenuOpen, setIsMenuOpen } = useApp();

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/watchlist', label: 'Watchlist', icon: ListVideo },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-dark-card border-r border-gray-800 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-64 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
              Menu
            </h2>
            <button
              onClick={closeMobileMenu}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-purple to-primary-pink text-white shadow-lg'
                      : 'text-gray-300 hover:bg-dark-hover hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800">
            <div className="bg-gradient-to-r from-primary-purple/10 to-primary-pink/10 p-4 rounded-lg border border-primary-purple/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary-pink" />
                <span className="font-semibold text-white">StreamFlix</span>
              </div>
              <p className="text-xs text-gray-400">
                Premium video streaming experience
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;
