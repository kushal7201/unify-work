import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await connectDB();
    let profile = await Profile.findOne({ userId: 'current-user' });
    
    if (!profile) {
      // Create default profile if it doesn't exist
      profile = await Profile.create({
        userId: 'current-user',
        name: 'Your Name',
        about: 'Hey there! I am using WhatsApp.',
        avatar: '😊',
        phone: '+1 234 567 8900',
      });
    }
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const profile = await Profile.findOneAndUpdate(
      { userId: 'current-user' },
      body,
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
