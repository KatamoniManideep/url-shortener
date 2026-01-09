'use client';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UrlStats() {
  const params = useParams();
  const shortId = params.shortId as string;
  
  const { data: stats, isLoading } = useSWR(`/api/stats/${shortId}`, fetcher, {
    refreshInterval: 2000
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Stats for /{shortId}</h1>
      <div className="grid grid-cols-3 gap-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{stats?.totalClicks || 0}</div>
          <div className='text-black'>Total Clicks</div>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="text-sm font-mono bg-gray-100 p-2 rounded text-black">{shortId}</div>
          <div className='text-black'>Short ID</div>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <div className="text-sm text-gray-500">{new Date(stats?.createdAt || '').toLocaleString()}</div>
          <div className='text-black'>Created</div>
        </div>
      </div>
    </div>
  );
}
