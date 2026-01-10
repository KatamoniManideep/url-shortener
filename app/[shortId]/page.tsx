import { redirect } from 'next/navigation';
import { connectDB, Url } from '@/lib/db';
import { getUrl } from '@/lib/redis';

export default async function ShortUrl({ params }: { params: Promise<{ shortId: string }> }) {
  await connectDB();
  
  const { shortId } = await params;

  let originalUrl= await getUrl(shortId);
  
  const url = await Url.findOneAndUpdate(
    { shortId },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  
  if (!url) {
    return new Response('URL not found', { status: 404 });
  }
  
  redirect(url.originalUrl);
}
