import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Cloud, Menu, User, LogOut, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/userSlice';
import { clearFavorites } from '../../redux/favoritesSlice';
import { authApi } from '../../utils/api';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, name } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      dispatch(clearFavorites());
      navigate('/');
      setIsProfileMenuOpen(false);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
    { name: 'Favorites', href: '/favorites' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl border-b border-white/20 dark:border-gray-700/50 transition-all duration-300 animate-slide-down sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group animate-slide-in-left">
            <div className="relative">
              <Cloud className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary-600/20 rounded-full blur-lg group-hover:bg-primary-600/40 transition-all duration-300"></div>
            </div>
            <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">WeatherPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 animate-fade-in">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 animate-slide-in-up stagger-${index + 1} ${
                  location.pathname === item.href
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white hover:shadow-lg'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4 animate-slide-in-right">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-primary hover:text-white transition-all duration-300 transform hover:scale-105 group"
                >
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors" />
                  <span className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">
                    {name}
                  </span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 card rounded-xl shadow-2xl py-2 z-50 animate-scale-in">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white transition-all duration-300 transform hover:scale-105 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white transition-all duration-300 transform hover:scale-105 rounded-lg mx-2"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white transition-all duration-300 transform hover:scale-105 rounded-lg mx-2"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm px-6 py-2"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-down">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-105 animate-slide-in-left stagger-${index + 1} ${
                  location.pathname === item.href
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-primary hover:text-white hover:shadow-lg'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;