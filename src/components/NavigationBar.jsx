import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleMenu } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark-bg/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-primary-purple transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary-purple to-primary-pink p-2 rounded-lg">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-primary-pink bg-clip-text text-transparent">
                StreamFlix
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="w-full px-4 py-2 pl-10 bg-dark-card border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-purple'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/watchlist"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/watchlist'
                  ? 'text-primary-purple'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Watchlist
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-semibold transition-colors ${
                location.pathname === '/profile'
                  ? 'text-primary-purple'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
