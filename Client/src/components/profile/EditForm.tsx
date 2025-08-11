import React, { useState } from 'react';
import { Save, X, User, Mail, MapPin, Thermometer } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateProfile } from '../../redux/userSlice';
import { userApi } from '../../utils/api';

interface EditFormProps {
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ onCancel }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    location: user.location || '',
    temperatureUnit: user.temperatureUnit,
    avatar: user.avatar || '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar || '');
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarCacheBust, setAvatarCacheBust] = useState(Date.now());
  const [successMessage, setSuccessMessage] = useState('');

  const defaultAvatar = '/default-profile.png';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5MB');
        return;
      }

      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setAvatarUpdated(true);
      };
      reader.onerror = () => {
        alert('Failed to read image file');
        setAvatarFile(null);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error handling avatar change:', error);
      alert('Failed to process image file');
      setAvatarFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    
    try {
      // Prepare profile data - only send fields that are actually changed
      const profileData: any = {};
      
      if (formData.name !== user.name) {
        profileData.name = formData.name;
      }
      if (formData.location !== user.location) {
        profileData.location = formData.location;
      }
      if (formData.temperatureUnit !== user.temperatureUnit) {
        profileData.temperatureUnit = formData.temperatureUnit;
      }

      // Upload avatar if updated
      if (avatarUpdated && avatarPreview) {
        try {
          const avatarUrl = await userApi.uploadAvatar(avatarPreview);
          profileData.avatar = avatarUrl;
          setAvatarCacheBust(Date.now());
        } catch (avatarError) {
          console.error('Avatar upload failed:', avatarError);
          alert('Failed to upload avatar. Profile will be updated without the new image.');
        }
      }

      // Only update profile if there are changes
      if (Object.keys(profileData).length > 0) {
        console.log('Updating profile with data:', profileData);
        const updatedUser = await userApi.updateProfile(profileData);
        
        // Update Redux store
        dispatch(updateProfile(updatedUser));
        setSuccessMessage('Profile updated successfully!');
      } else {
        setSuccessMessage('No changes to save.');
      }
      
      // Close form after a short delay
      setTimeout(() => {
        onCancel();
      }, 1500);
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 animate-scale-in">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transform hover:scale-110 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="card p-6 animate-slide-in-left">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <User className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="input-field"
                placeholder="Enter your email"
                disabled
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className="input-field"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This helps us provide more relevant weather information
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Thermometer className="h-4 w-4 inline mr-2" />
                Temperature Unit
              </label>
              <select
                name="temperatureUnit"
                value={formData.temperatureUnit}
                onChange={handleChange}
                className="input-field"
              >
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Image
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="input-field flex-1"
                    id="avatar-input"
                  />
                  {avatarFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(user.avatar || '');
                        setAvatarUpdated(false);
                        // Reset the file input
                        const fileInput = document.getElementById('avatar-input') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                      }}
                      className="px-3 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
                    >
                      Reset
                    </button>
                  )}
                </div>
                {avatarFile && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    ✓ New image selected: {avatarFile.name}
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <img
                    src={(avatarPreview || defaultAvatar) + `?cb=${avatarCacheBust}`}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600 object-cover"
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Current profile image</p>
                    <p className="text-xs">Click "Choose File" to upload a new one</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message and Save Button */}
        <div className="flex flex-col items-end space-y-2 pt-6">
          {successMessage && (
            <div className="text-green-600 mb-2 font-medium">{successMessage}</div>
          )}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditForm;