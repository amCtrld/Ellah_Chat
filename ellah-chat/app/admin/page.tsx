'use client';

import React, { useState } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { Button } from "@/components/ui/button";
import { format, isToday, isYesterday } from 'date-fns';

interface Message {
  id: number;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

interface Staff {
  id: number;
  name: string;
  lastMessage?: Message;
}

const AdminChat: React.FC = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: 1, name: "John Doe", lastMessage: { id: 1, content: "Hello", timestamp: new Date(2023, 5, 1, 9, 0), isAdmin: false } },
    { id: 2, name: "Jane Smith", lastMessage: { id: 2, content: "Hi there", timestamp: new Date(2023, 5, 2, 10, 30), isAdmin: false } },
    { id: 3, name: "Bob Johnson", lastMessage: { id: 3, content: "Good morning", timestamp: new Date(), isAdmin: false } },
  ]);

  const handleSelectStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    // In a real application, you would fetch the chat history for this staff member here
    setMessages([
      { id: 1, content: "Hello, I have a question.", timestamp: new Date(2023, 5, 1, 9, 0), isAdmin: false },
      { id: 2, content: "Sure, how can I help you?", timestamp: new Date(2023, 5, 1, 9, 5), isAdmin: true },
    ]);
  };

  const handleSendMessage = (content: string, scheduledTime?: Date) => {
    if (selectedStaff) {
      const newMessage: Message = {
        id: messages.length + 1,
        content,
        timestamp: scheduledTime || new Date(),
        isAdmin: true,
      };
      setMessages([...messages, newMessage]);
      
      // Update the staff's last message
      setStaffList(prevList => 
        prevList.map(staff => 
          staff.id === selectedStaff.id 
            ? { ...staff, lastMessage: newMessage } 
            : staff
        )
      );
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    if (isToday(timestamp)) {
      return format(timestamp, 'HH:mm');
    } else if (isYesterday(timestamp)) {
      return `Yesterday ${format(timestamp, 'HH:mm')}`;
    } else {
      return format(timestamp, 'MMM d, yyyy HH:mm');
    }
  };

  // Sort staff list based on the latest message timestamp
  const sortedStaffList = [...staffList].sort((a, b) => {
    const aTime = a.lastMessage?.timestamp.getTime() || 0;
    const bTime = b.lastMessage?.timestamp.getTime() || 0;
    return bTime - aTime;
  });

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4 border-r-2 bg-blue-200">
        <h2 className="text-xl font-semibold mb-4">Staff List</h2>
        {sortedStaffList.map((staff) => (
          <Button
            key={staff.id}
            onClick={() => handleSelectStaff(staff)}
            className="w-full mb-2 justify-start flex-col items-start p-2 h-auto"
            variant={selectedStaff?.id === staff.id ? "default" : "ghost"}
          >
            <span className="text-left">{staff.name}</span>
            {staff.lastMessage && (
              <span className="text-xs text-gray-500">
                {formatTimestamp(staff.lastMessage.timestamp)}
              </span>
            )}
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