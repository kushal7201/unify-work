import mongoose, { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, required: true },
  sender: { type: String, enum: ['me', 'them'], required: true },
}, { _id: false });

const ChatSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  lastMessage: { type: String, required: true },
  time: { type: String, required: true },
  unread: { type: Number, default: 0 },
  messages: [MessageSchema],
}, {
  timestamps: true,
});

const Chat = models.Chat || model('Chat', ChatSchema);

export default Chat;
