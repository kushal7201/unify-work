'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { Chat } from '@/types';

// Fetch chats from API
async function fetchChats(): Promise<Chat[]> {
  const response = await fetch('/api/chats');
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch chats');
  }
  return data.data;
}

// Send message to API
async function sendMessage({ chatId, message }: { chatId: string; message: any }) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to send message');
  }
  return data.data;
}

export default function Home() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const queryClient = useQueryClient();

  // Fetch chats with React Query
  const { data: chats = [], isLoading, error } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      // Invalidate and refetch chats after sending a message
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  const filteredChats = useMemo(() => {
    return chats.filter((chat: Chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [chats, searchQuery]);

  const selectedChat = useMemo(() => {
    return chats.find((chat: Chat) => chat.id === selectedChatId);
  }, [chats, selectedChatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChatId) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')}`;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      time: timeStr,
      sender: 'me' as const,
    };

    sendMessageMutation.mutate({ chatId: selectedChatId, message });
    setNewMessage('');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25d366] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading chats: {(error as Error).message}</p>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['chats'] })}
            className="bg-[#25d366] text-white px-4 py-2 rounded-lg hover:bg-[#20bd5a]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        chats={filteredChats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ChatWindow
        chat={selectedChat}
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
