
import { NextResponse } from 'next/server';
import { Redis } from "@upstash/redis";
import { connectDB, Url } from '@/lib/db';
import { incrementClicks } from '@/lib/redis';

const redis=Redis.fromEnv()

export const dynamic = 'force-dynamic'; 

export async function GET(req: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  
  
  await connectDB();
  const url = await Url.findOne({ shortId });
  const cached = await redis.exists(`url:${shortId}`);
 

  return NextResponse.json({
    shortId,
    totalClicks: url?.clicks || 0,
    inRedisCache: cached === 1,
    originalUrl: url?.originalUrl || ''
  });
}
