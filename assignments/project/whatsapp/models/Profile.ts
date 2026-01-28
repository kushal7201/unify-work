import mongoose, { Schema, model, models } from 'mongoose';

const ProfileSchema = new Schema({
  userId: { type: String, required: true, unique: true, default: 'current-user' },
  name: { type: String, required: true },
  about: { type: String, required: true },
  avatar: { type: String, required: true },
  phone: { type: String, required: true },
}, {
  timestamps: true,
});

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile;
