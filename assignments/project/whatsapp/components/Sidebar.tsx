'use client';

import { useState } from 'react';
import { Chat } from '@/types';
import CallsList from './CallsList';
import Profile from './Profile';
import Settings from './Settings';
import Image from 'next/image'

type ViewType = 'chats' | 'calls' | 'profile' | 'settings';

interface SidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Sidebar({
  chats,
  selectedChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [currentView, setCurrentView] = useState<ViewType>('chats');

  return (
    <div className="w-[400px] bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-[#f0f2f5] px-4 py-3 flex items-center justify-between">
        {currentView === 'profile' || currentView === 'settings' ? (
          <button
            onClick={() => setCurrentView('chats')}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setCurrentView('profile')}
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl hover:opacity-80 cursor-pointer"
          >
            <Image src="/profile.svg" alt="Profile" width={25} height={25} /> 
          </button>
        )}
        <div className="flex gap-6 text-gray-600">
          {currentView === 'chats' && (
            <>
              <button
                onClick={() => setCurrentView('calls')}
                className="hover:text-gray-900 cursor-pointer"
                title="Calls"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentView('settings')}
                className="hover:text-gray-900 cursor-pointer"
                title="Settings"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content based on current view */}
      {currentView === 'chats' && (
        <>
          {/* Search */}
          <div className="px-3 py-2 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Search or start new chat"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-[#f0f2f5] rounded-lg text-sm focus:outline-none"
              />
              <svg
                className="absolute left-4 top-2.5 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-[#f5f6f6] ${
                  selectedChatId === chat.id ? 'bg-[#f0f2f5]' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl flex-shrink-0">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0 border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-[#25d366] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {currentView === 'calls' && <CallsList />}
      {currentView === 'profile' && <Profile />}
      {currentView === 'settings' && <Settings />}
    </div>
  );
}
