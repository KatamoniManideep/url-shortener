
'use client';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Dashboard() {
  const { data: stats } = useSWR('/api/stats/X7kP9mN', fetcher, {
    refreshInterval: 5000 
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>
      
      {stats && (
        <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.totalClicks}</div>
            <div className="text-gray-500">Total Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.currentClicks}</div>
            <div className="text-gray-500">Live Counter</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">{stats.lastUpdated}</div>
            <div>Last Click</div>
          </div>
        </div>
      )}
    </div>
  );
}
