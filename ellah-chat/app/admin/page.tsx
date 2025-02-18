'use client';

import React, { useState } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

interface Staff {
  id: number;
  name: string;
}

const AdminChat: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [staffList] = useState<Staff[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ]);

  const handleSelectStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    // In a real application, you would fetch the chat history for this staff member here
    setMessages([
      { id: 1, content: "Hello, I have a question.", timestamp: new Date(2023, 5, 1, 9, 0), isAdmin: false },
      { id: 2, content: "Sure, how can I help you?", timestamp: new Date(2023, 5, 1, 9, 5), isAdmin: true },
    ]);
  };

  const handleSendMessage = (content: string) => {
    if (selectedStaff) {
      const newMessage: Message = {
        id: messages.length + 1,
        content,
        timestamp: new Date(),
        isAdmin: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl font-semibold mb-4">Staff List</h2>
        {staffList.map((staff) => (
          <Button
            key={staff.id}
            onClick={() => handleSelectStaff(staff)}
            className="w-full mb-2"
            variant={selectedStaff?.id === staff.id ? "default" : "outline"}
          >
            {staff.name}
          </Button>
        ))}
      </div>
      <div className="flex-grow flex flex-col">
        {selectedStaff ? (
          <>
            <ChatHeader title={`Chat with ${selectedStaff.name}`} />
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
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">Select a staff member to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;