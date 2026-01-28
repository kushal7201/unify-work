'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

interface ProfileData {
  name: string;
  about: string;
  avatar: string;
  phone: string;
}

async function fetchProfile(): Promise<ProfileData> {
  const response = await fetch('/api/profile');
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch profile');
  }
  return data.data;
}

async function updateProfile(profileData: Partial<ProfileData>) {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to update profile');
  }
  return data.data;
}

export default function Profile() {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAbout(profile.about);
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const handleNameBlur = () => {
    setIsEditingName(false);
    if (profile && name !== profile.name) {
      updateMutation.mutate({ name });
    }
  };

  const handleAboutBlur = () => {
    setIsEditingAbout(false);
    if (profile && about !== profile.about) {
      updateMutation.mutate({ about });
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#25d366]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {/* Profile Photo */}
      <div className="bg-[#f0f2f5] py-16 flex justify-center">
        <div className="relative">
          <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center text-8xl">
            <Image src="/profile.svg" alt="Profile" width={150} height={150} />
          </div>
          <button className="absolute bottom-2 right-2 bg-[#25d366] text-white p-3 rounded-full shadow-lg hover:bg-[#20bd5a]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-6">
        <div className="mb-6">
          <label className="text-sm text-[#25d366] mb-2 block">Your name</label>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameBlur}
                autoFocus
                className="flex-1 py-2 border-b-2 border-[#25d366] focus:outline-none"
              />
            </div>
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded"
            >
              <span className="text-gray-900">{name}</span>
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">
            This name will be visible to your WhatsApp contacts.
          </p>
        </div>

        <div className="mb-6">
          <label className="text-sm text-[#25d366] mb-2 block">About</label>
          {isEditingAbout ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                onBlur={handleAboutBlur}
                autoFocus
                className="flex-1 py-2 border-b-2 border-[#25d366] focus:outline-none"
              />
            </div>
          ) : (
            <div
              onClick={() => setIsEditingAbout(true)}
              className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded"
            >
              <span className="text-gray-900">{about}</span>
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="text-sm text-[#25d366] mb-2 block">Phone</label>
          <div className="py-2">
            <span className="text-gray-900">{profile?.phone || '+1 234 567 8900'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
