import ChatWindow from '@/components/admin/support-chat/ChatWindow';
import React from 'react';

const ChatDetailPage = ({ params }) => {
  const { conversationId } = params;

  return (
    <div className="h-screen flex flex-col">
      <ChatWindow conversationId={conversationId} />
    </div>
  );
};

export default ChatDetailPage;
