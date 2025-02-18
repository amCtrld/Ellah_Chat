import React from 'react';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[#29a9e1] text-white p-4">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default ChatHeader;