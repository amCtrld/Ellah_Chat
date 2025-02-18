'use client';

import React, { useState } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

const StaffChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello, how can I help you today?", timestamp: new Date(2023, 5, 1, 9, 0), isAdmin: true },
    { id: 2, content: "I have a question about my account.", timestamp: new Date(2023, 5, 1, 9, 5), isAdmin: false },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      timestamp: new Date(),
      isAdmin: false,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader title="Chat with Admin" />
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
            isAdmin={message.isAdmin}
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default StaffChat;