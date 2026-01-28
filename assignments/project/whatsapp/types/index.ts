export interface Message {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'them';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}
