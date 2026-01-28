import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Chat from '@/models/Chat';
import Call from '@/models/Call';
import Profile from '@/models/Profile';

const INITIAL_CHATS = [
  {
    id: '1',
    name: 'Mom',
    avatar: '👩',
    lastMessage: "Don't forget to buy groceries",
    time: '10:30 AM',
    unread: 2,
    messages: [
      { id: '1', text: 'Hey, how are you?', time: '10:15 AM', sender: 'them' },
      { id: '2', text: "I'm good! How about you?", time: '10:20 AM', sender: 'me' },
      { id: '3', text: 'Doing well, thanks', time: '10:25 AM', sender: 'them' },
      { id: '4', text: "Don't forget to buy groceries", time: '10:30 AM', sender: 'them' },
    ],
  },
  {
    id: '2',
    name: 'Work Team',
    avatar: '💼',
    lastMessage: "Don't forget we have a meeting at 3 PM",
    time: '9:45 AM',
    unread: 5,
    messages: [
      { id: '1', text: 'Good morning everyone', time: '9:00 AM', sender: 'them' },
      { id: '2', text: 'Morning!', time: '9:05 AM', sender: 'me' },
      { id: '3', text: "Don't forget we have a meeting at 3 PM", time: '9:45 AM', sender: 'them' },
    ],
  },
  {
    id: '3',
    name: 'Sister',
    avatar: '👱‍♀️',
    lastMessage: 'See you tomorrow!',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: '1', text: 'Are you coming to the party?', time: 'Yesterday', sender: 'them' },
      { id: '2', text: "Yes, I'll be there!", time: 'Yesterday', sender: 'me' },
      { id: '3', text: 'Awesome! See you tomorrow!', time: 'Yesterday', sender: 'them' },
    ],
  },
  {
    id: '4',
    name: 'Test',
    avatar: '👨',
    lastMessage: 'Thanks for the help',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: '1', text: 'Can you help me with this issue?', time: 'Yesterday', sender: 'them' },
      { id: '2', text: 'Sure, what do you need?', time: 'Yesterday', sender: 'me' },
      { id: '3', text: 'Thanks for the help', time: 'Yesterday', sender: 'them' },
    ],
  },
  {
    id: '5',
    name: 'Coffee Lovers',
    avatar: '☕',
    lastMessage: 'Who wants coffee?',
    time: '2 days ago',
    unread: 0,
    messages: [
      { id: '1', text: 'Who wants to grab coffee this weekend?', time: '2 days ago', sender: 'them' },
      { id: '2', text: 'Count me in!', time: '2 days ago', sender: 'me' },
    ],
  },
];

const INITIAL_CALLS = [
  { id: '1', name: 'Mom', avatar: '👩', type: 'incoming', time: '2 hours ago', isVideo: false },
  { id: '2', name: 'Sister', avatar: '👱‍♀️', type: 'outgoing', time: 'Yesterday', isVideo: true },
  { id: '3', name: 'Test', avatar: '👨', type: 'missed', time: 'Yesterday', isVideo: false },
  { id: '4', name: 'Work Team', avatar: '💼', type: 'outgoing', time: '2 days ago', isVideo: true },
  { id: '5', name: 'Coffee Lovers', avatar: '☕', type: 'incoming', time: '3 days ago', isVideo: false },
];

const INITIAL_PROFILE = {
  userId: 'current-user',
  name: 'Kushal Bansal',
  about: 'Hey there! I am using WhatsApp.',
  avatar: '😊',
  phone: '+91 9999999999',
};

export async function POST() {
  try {
    await connectDB();
    
    // Clear existing data
    await Chat.deleteMany({});
    await Call.deleteMany({});
    await Profile.deleteMany({});
    
    // Insert initial data
    await Chat.insertMany(INITIAL_CHATS);
    await Call.insertMany(INITIAL_CALLS);
    await Profile.create(INITIAL_PROFILE);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully',
      data: {
        chats: INITIAL_CHATS.length,
        calls: INITIAL_CALLS.length,
        profile: 1,
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Send a POST request to seed the database with initial data' 
  });
}
