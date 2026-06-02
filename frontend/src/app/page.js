'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <div className="p-6 bg-slate-800 rounded-xl shadow-md border border-slate-700">
        <h1 className="text-2xl font-bold mb-2">WhatsApp Web Clone</h1>
        <p className="flex items-center gap-2">
          Server Status: 
          <span className={`inline-block w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          {isConnected ? 'Connected' : 'Disconnected'}
        </p>
      </div>
    </main>
  );
}