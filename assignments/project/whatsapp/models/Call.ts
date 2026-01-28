import mongoose, { Schema, model, models } from 'mongoose';

const CallSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  type: { type: String, enum: ['incoming', 'outgoing', 'missed'], required: true },
  time: { type: String, required: true },
  isVideo: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Call = models.Call || model('Call', CallSchema);

export default Call;
