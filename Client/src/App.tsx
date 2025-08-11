import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import { setTheme } from './redux/themeSlice';
import { login, logout } from './redux/userSlice';
import { clearFavorites } from './redux/favoritesSlice';
import { getToken, userApi } from './utils/api';

// Layout Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Settings from './pages/Settings';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);

  // Check if current route is login page
  const isAuthPage = location.pathname === '/login';

  useEffect(() => {
    // Initialize theme on app load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    dispatch(setTheme(shouldBeDark));
    document.documentElement.classList.toggle('dark', shouldBeDark);

    // Check for saved token and restore user session
    const checkAuthStatus = async () => {
      const token = getToken();
      if (token) {
        try {
          const user = await userApi.getProfile();
          dispatch(login(user));
        } catch (error) {
          console.error('Token validation failed:', error);
          // Token is invalid, remove it and clear user data
          localStorage.removeItem('weatherpro_token');
          dispatch(logout());
          dispatch(clearFavorites());
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"><span>Loading...</span></div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {!isAuthPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;