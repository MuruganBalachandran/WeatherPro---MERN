import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateProfile } from '../redux/userSlice';
import { Palette, Globe, Zap, Thermometer, Wind, Gauge, Bell, Shield, Eye, MapPin, Check, User, LogOut, Star, TrendingUp, Calendar, Clock, Image as ImageIcon } from 'lucide-react';
import { userApi } from '../utils/api';

const defaultAvatar = '/default-profile.png';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Profile image upload
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || defaultAvatar);
  const [savingAvatar, setSavingAvatar] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSave = async () => {
    if (!avatar) return;
    setSavingAvatar(true);
    try {
      const updatedUser = await userApi.updateProfile({ avatar });
      dispatch(updateProfile(updatedUser));
    } catch (error) {
      // handle error
    } finally {
      setSavingAvatar(false);
    }
  };

  // App Preferences
  const [theme, setTheme] = useState('auto');
  const [language, setLanguage] = useState('english');
  const [autoRefresh, setAutoRefresh] = useState('15');

  // Weather Settings
  const [defaultView, setDefaultView] = useState('current');
  const [windUnit, setWindUnit] = useState('ms');
  const [pressureUnit, setPressureUnit] = useState('hpa');

  // Notification Preferences
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [dailyForecast, setDailyForecast] = useState(true);
  const [severeWarnings, setSevereWarnings] = useState(true);

  // Privacy & Security
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [dataSharing, setDataSharing] = useState(false);
  const [locationAccess, setLocationAccess] = useState(true);

  // Activity Summary (mock data)
  const activitySummary = {
    weatherChecks: 247,
    citiesSearched: 42,
    favoriteUpdates: 18,
  };
  const recentActivity = [
    { text: 'Added Tokyo to favorites', time: '2 hours ago' },
    { text: 'Updated temperature unit to Celsius', time: '1 day ago' },
    { text: 'Searched weather for London', time: '3 days ago' },
    { text: 'Enabled weather alerts', time: '5 days ago' },
    { text: 'Profile picture updated', time: '1 week ago' },
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      {/* Account Settings */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><User /> Account Settings</h2>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={avatarPreview || defaultAvatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
            />
            <label className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer hover:bg-primary-700 transition-all">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <ImageIcon className="h-5 w-5" />
            </label>
          </div>
          <button
            onClick={handleAvatarSave}
            className="btn-primary px-4 py-2 rounded-lg ml-2"
            disabled={savingAvatar}
          >
            {savingAvatar ? 'Saving...' : 'Save Image'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Profile Visibility</label>
            <select value={profileVisibility} onChange={e => setProfileVisibility(e.target.value)} className="input-field">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Data Sharing</label>
            <input type="text" value={dataSharing ? 'Enabled' : 'Disabled'} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Two-Factor Auth</label>
            <input type="text" value="Enabled" readOnly className="input-field" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Bell /> Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Weather Alerts</label>
            <input type="text" value={weatherAlerts ? 'Enabled' : 'Disabled'} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Daily Forecast</label>
            <input type="text" value={dailyForecast ? 'Enabled' : 'Disabled'} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Severe Weather</label>
            <input type="text" value={severeWarnings ? 'Enabled' : 'Disabled'} readOnly className="input-field" />
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield /> Privacy & Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Location Access</label>
            <input type="text" value={locationAccess ? 'Allowed' : 'Denied'} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Data Encryption</label>
            <input type="text" value="Active" readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Session Timeout</label>
            <input type="text" value="30 days" readOnly className="input-field" />
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Palette /> App Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Theme</label>
            <input type="text" value={theme === 'auto' ? 'Auto' : theme} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Language</label>
            <input type="text" value={language} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Auto-refresh</label>
            <input type="text" value={autoRefresh + ' min'} readOnly className="input-field" />
          </div>
        </div>
      </div>

      {/* Weather Settings */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Thermometer /> Weather Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Default View</label>
            <input type="text" value={defaultView === 'current' ? 'Current' : defaultView} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Wind Speed Unit</label>
            <input type="text" value={windUnit} readOnly className="input-field" />
          </div>
          <div>
            <label className="block font-medium mb-1">Pressure Unit</label>
            <input type="text" value={pressureUnit} readOnly className="input-field" />
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><TrendingUp /> Activity Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Check className="h-6 w-6 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{activitySummary.weatherChecks}</div>
            </div>
            <div className="text-sm text-blue-600/80">Weather Checks</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-6 w-6 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{activitySummary.citiesSearched}</div>
            </div>
            <div className="text-sm text-green-600/80">Cities Searched</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{activitySummary.favoriteUpdates}</div>
            </div>
            <div className="text-sm text-purple-600/80">Favorite Updates</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <ul className="space-y-2">
            {recentActivity.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Check className="h-4 w-4 text-primary-600" />
                <span>{item.text}</span>
                <span className="ml-auto text-xs text-gray-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings; 