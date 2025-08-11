import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import ProfileCard from '../components/profile/ProfileCard';
import EditForm from '../components/profile/EditForm';

const Profile: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [isEditing, setIsEditing] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        {isEditing ? (
          <EditForm onCancel={() => setIsEditing(false)} />
        ) : (
          <ProfileCard onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default Profile;