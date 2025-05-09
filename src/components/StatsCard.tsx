"use client";

import { useEffect, useState } from "react";

export default function StatsCard() {
  const [stats, setStats] = useState<{
    total: number;
    read: number;
    averageRating: number;
  } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-white text-center max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">📊 Book Stats</h2>
      <p>Total Books: <span className="font-bold">{stats.total}</span></p>
      <p>Books Read: <span className="font-bold">{stats.read}</span></p>
      

    </div>
  );
}
