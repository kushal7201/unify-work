'use client';

import { useQuery } from '@tanstack/react-query';

interface Call {
  id: string;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  isVideo: boolean;
}

async function fetchCalls(): Promise<Call[]> {
  const response = await fetch('/api/calls');
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch calls');
  }
  return data.data;
}

export default function CallsList() {
  const { data: calls = [], isLoading, error } = useQuery({
    queryKey: ['calls'],
    queryFn: fetchCalls,
  });

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#25d366] mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        <p className="text-red-500 text-sm">Failed to load calls</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-4">
        <h2 className="text-sm font-medium text-gray-600 mb-3">Recent</h2>
        {calls.map((call) => (
          <div
            key={call.id}
            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-[#f5f6f6] px-2 rounded"
          >
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl flex-shrink-0">
              {call.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900">{call.name}</h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {call.time}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg
                  className={`w-4 h-4 ${
                    call.type === 'missed' ? 'text-red-500' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {call.type === 'incoming' ? (
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                  ) : call.type === 'outgoing' ? (
                    <path d="M9 5c.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1s-1-.4-1-1V7.7l8.6 8.6c.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0L6.7 9h1.8c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1v3.5c0 .6.4 1 1 1s1-.4 1-1V8.4l7.3 7.3c1.2 1.2 3.1 1.2 4.2 0 1.2-1.2 1.2-3.1 0-4.2L10.3 5H9z" />
                  ) : (
                    <path d="M19.23 15.26l-2.54-.29a1.99 1.99 0 00-1.64.57l-1.84 1.84a15.045 15.045 0 01-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 00-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                  )}
                </svg>
                <span className={call.type === 'missed' ? 'text-red-500' : ''}>
                  {call.type === 'missed' ? 'Missed' : call.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                </span>
              </div>
            </div>
            <button className="text-[#25d366] hover:bg-gray-100 p-2 rounded-full">
              {call.isVideo ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
