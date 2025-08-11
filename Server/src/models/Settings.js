import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  notifications: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'system',
  },
  language: {
    type: String,
    default: 'en',
  },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings; 