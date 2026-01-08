'use server';

import { generateShortId } from '@/lib/id';
import { connectDB, Url } from '@/lib/db';

export async function createShortUrl(
  _prev: string | null,
  formData: FormData
): Promise<string> {
  await connectDB();

  const targetUrl = formData.get('url') as string;
  const shortId = generateShortId();

  await Url.create({ shortId, originalUrl: targetUrl });

  return `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`;
}
