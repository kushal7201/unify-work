'use client';

import { useEffect, useRef } from 'react';
import { Chat } from '@/types';
import Image from 'next/image';

interface ChatWindowProps {
  chat: Chat | undefined;
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
}

export default function ChatWindow({
  chat,
  newMessage,
  onMessageChange,
  onSendMessage,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
        <div className="text-center">
            <div className="flex justify-center items-center w-64 h-50 mx-auto opacity-70">
            <Image src="/whatsapp.svg" alt="Profile" width={120} height={120} ></Image>
            </div>
          <h2 className="text-3xl text-gray-500 mb-2">WhatsApp Web</h2>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            Send and receive messages without keeping your phone online.
          </p>
        </div>
      </div>
    );
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#efeae2]">
      {/* Chat Header */}
      <div className="bg-[#f0f2f5] px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
          {chat.avatar}
        </div>
        <div className="flex-1">
          <h2 className="font-medium text-gray-900">{chat.name}</h2>
          <p className="text-xs text-gray-500">online</p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-16 py-4"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23d9dbd5' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col gap-2">
          {chat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[65%] rounded-lg px-3 py-2 shadow-sm ${
                  message.sender === 'me'
                    ? 'bg-[#d9fdd3]'
                    : 'bg-white'
                }`}
              >
                <p className="text-sm text-gray-900 break-words">
                  {message.text}
                </p>
                <p className="text-[10px] text-gray-500 text-right mt-1">
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-[#f0f2f5] px-4 py-2 flex items-center gap-2">
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
          </svg>
        </button>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2.5 bg-white rounded-lg text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={onSendMessage}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
