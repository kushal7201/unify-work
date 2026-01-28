import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Call from '@/models/Call';

export async function GET() {
  try {
    await connectDB();
    const calls = await Call.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: calls });
  } catch (error) {
    console.error('Error fetching calls:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch calls' },
      { status: 500 }
    );
  }
}
