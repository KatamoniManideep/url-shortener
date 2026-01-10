'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UrlStats() {
  const params = useParams();
  const shortId = params.shortId as string;
  
  const { data: stats, isLoading } = useSWR(`/api/stats/${shortId}`, fetcher, {
    refreshInterval: 10000  
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1>Stats for /{shortId}</h1>
      
      <div className="grid grid-cols-2 gap-6 p-8 bg-gray-50 rounded-xl">
        <div className="text-center p-6 bg-white rounded-lg">
          <div className="text-3xl font-bold text-blue-600">
            {stats?.totalClicks || 0}
          </div>
          <div className="text-sm text-gray-500 mt-1">MongoDB Total</div>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg">
          <div className="text-lg font-mono bg-gray-100 p-2 rounded text-black">
            {stats?.inRedisCache ? 'CACHED' : 'MISS'}
          </div>
          <div className="text-sm text-gray-500 mt-1">Redis Status</div>
        </div>
      </div>

      
    </div>
  );
}
