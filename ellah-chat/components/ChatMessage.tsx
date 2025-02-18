import React from 'react';
import { format } from 'date-fns';

interface ChatMessageProps {
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, timestamp, isAdmin }) => {
  return (
    <div className={`flex ${isAdmin ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${isAdmin ? 'bg-gray-200' : 'bg-[#29a9e1] text-white'}`}>
        <p className="text-sm">{content}</p>
        <p className={`text-xs mt-1 ${isAdmin ? 'text-gray-500' : 'text-gray-200'}`}>
          {format(timestamp, 'HH:mm | MMM d, yyyy')}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;