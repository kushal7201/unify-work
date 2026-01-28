import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Chat from '@/models/Chat';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { chatId, message } = await request.json();
    
    const chat = await Chat.findOne({ id: chatId });
    
    if (!chat) {
      return NextResponse.json(
        { success: false, error: 'Chat not found' },
        { status: 404 }
      );
    }
    
    chat.messages.push(message);
    chat.lastMessage = message.text;
    chat.time = message.time;
    
    await chat.save();
    
    return NextResponse.json({ success: true, data: chat });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add message' },
      { status: 500 }
    );
  }
}
