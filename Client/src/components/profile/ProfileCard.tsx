import React from 'react';
import { Edit3, MapPin, Thermometer, Calendar, Clock, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ProfileCardProps {
  onEdit: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onEdit }) => {
  const user = useSelector((state: RootState) => state.user);
  const favoriteCount = useSelector((state: RootState) => state.favorites.cities.length);

  const joinDate = new Date(2024, 0, 15); // Mock join date
  const daysActive = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="card p-8 animate-scale-in">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative animate-bounce-gentle">
            <img
              src={user.avatar || '/default-profile.png'}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-700 animate-pulse"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="animate-slide-in-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">{user.email}</p>
                <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400 mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              <button
                onClick={onEdit}
                className="mt-4 md:mt-0 btn-primary flex items-center space-x-2 animate-slide-in-right"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* User Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-delayed">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="h-6 w-6 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{favoriteCount}</div>
                </div>
                <div className="text-sm text-blue-600/80">Saved Cities</div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Thermometer className="h-6 w-6 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">°{user.temperatureUnit}</div>
                </div>
                <div className="text-sm text-green-600/80">Temperature Unit</div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="h-6 w-6 text-purple-600" />
                  <div className="text-lg font-bold text-purple-600 truncate">
                    {user.location || 'Not set'}
                  </div>
                </div>
                <div className="text-sm text-purple-600/80">Location</div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <div className="text-2xl font-bold text-orange-600">{daysActive}</div>
                </div>
                <div className="text-sm text-orange-600/80">Days Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;