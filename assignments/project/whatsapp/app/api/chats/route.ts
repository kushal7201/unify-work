import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Chat from '@/models/Chat';

// GET all chats
export async function GET() {
  try {
    await connectDB();
    const chats = await Chat.find({}).sort({ updatedAt: -1 });
    return NextResponse.json({ success: true, data: chats });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chats' },
      { status: 500 }
    );
  }
}

// POST - Create or update chat
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const chat = await Chat.findOneAndUpdate(
      { id: body.id },
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: chat });
  } catch (error) {
    console.error('Error creating/updating chat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create/update chat' },
      { status: 500 }
    );
  }
}
