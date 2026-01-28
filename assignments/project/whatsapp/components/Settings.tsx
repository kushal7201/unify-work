'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface ProfileData {
  name: string;
  about: string;
  avatar: string;
}

async function fetchProfile(): Promise<ProfileData> {
  const response = await fetch('/api/profile');
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch profile');
  }
  return data.data;
}

export default function Settings() {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="py-4">
        {/* Profile Section */}
        <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-3xl">
            {<Image src="/profile.svg" alt="Profile" width={25} height={25} /> }
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{profile?.name || 'Your Name'}</h3>
            <p className="text-sm text-gray-500">{profile?.about || 'Hey there! I am using WhatsApp.'}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-4"></div>

        {/* Settings Options */}
        <div className="mt-2">
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            }
            title="Account"
            subtitle="Privacy, security, change number"
          />
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
              </svg>
            }
            title="Chats"
            subtitle="Theme, wallpapers, chat history"
          />
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            }
            title="Notifications"
            subtitle="Message, group & call tones"
          />
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              </svg>
            }
            title="Storage and data"
            subtitle="Network usage, auto-download"
          />
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            }
            title="Help"
            subtitle="Help center, contact us, privacy policy"
          />
          <SettingsItem
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            }
            title="Invite a friend"
            subtitle=""
          />
        </div>
      </div>
    </div>
  );
}

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function SettingsItem({ icon, title, subtitle }: SettingsItemProps) {
  return (
    <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center gap-6">
      <div className="text-gray-600">{icon}</div>
      <div className="flex-1">
        <h3 className="text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
