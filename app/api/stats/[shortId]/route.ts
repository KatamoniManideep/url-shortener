import { NextResponse } from 'next/server';
import { connectDB, Url } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  await connectDB();
  const { shortId } = await params;
  
  const url = await Url.findOne({ shortId });
  
  return NextResponse.json({
    shortId,
    totalClicks: url?.clicks || 0,
    originalUrl: url?.originalUrl,
    createdAt: url?.createdAt
  });
}
