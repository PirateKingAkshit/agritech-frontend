"use client";

import { useEffect, useCallback } from 'react';
import { useSocket } from '@/context/SocketContext';
import { playNotificationSound, showNotification } from '@/lib/chatUtils';

/**
 * Custom hook for managing chat-related Socket.IO events
 * Provides centralized event handling for all chat components
 */
export const useChatEvents = ({
  onNewMessage,
  onNotificationNewMessage,
  onTypingStart,
  onTypingStop,
  onMessageReadReceipt,
  onConversationAllRead,
  onUserOnline,
  onUserOffline,
  onError,
  enableNotifications = true,
  enableSounds = true
}) => {
  const { on, off, isConnected } = useSocket();

  // Handle new message event
  const handleNewMessage = useCallback((data) => {
    console.log('New message received:', data);
    if (onNewMessage) {
      onNewMessage(data);
    }
  }, [onNewMessage]);

  // Handle notification for new message (when not in conversation)
  const handleNotificationNewMessage = useCallback((data) => {
    console.log('New message notification:', data);
    
    if (enableSounds) {
      playNotificationSound();
    }
    
    if (enableNotifications) {
      showNotification(
        `New message from ${data.sender?.name || 'Unknown'}`,
        {
          body: data.message?.content || 'New message',
          tag: `conversation-${data.conversationId}`,
          requireInteraction: false
        }
      );
    }
    
    if (onNotificationNewMessage) {
      onNotificationNewMessage(data);
    }
  }, [onNotificationNewMessage, enableSounds, enableNotifications]);

  // Handle typing start
  const handleTypingStart = useCallback((data) => {
    console.log('User started typing:', data);
    if (onTypingStart) {
      onTypingStart(data);
    }
  }, [onTypingStart]);

  // Handle typing stop
  const handleTypingStop = useCallback((data) => {
    console.log('User stopped typing:', data);
    if (onTypingStop) {
      onTypingStop(data);
    }
  }, [onTypingStop]);

  // Handle message read receipt
  const handleMessageReadReceipt = useCallback((data) => {
    console.log('Message read receipt:', data);
    if (onMessageReadReceipt) {
      onMessageReadReceipt(data);
    }
  }, [onMessageReadReceipt]);

  // Handle conversation marked as read
  const handleConversationAllRead = useCallback((data) => {
    console.log('Conversation marked as read:', data);
    if (onConversationAllRead) {
      onConversationAllRead(data);
    }
  }, [onConversationAllRead]);

  // Handle user online
  const handleUserOnline = useCallback((data) => {
    console.log('User came online:', data);
    if (onUserOnline) {
      onUserOnline(data);
    }
  }, [onUserOnline]);

  // Handle user offline
  const handleUserOffline = useCallback((data) => {
    console.log('User went offline:', data);
    if (onUserOffline) {
      onUserOffline(data);
    }
  }, [onUserOffline]);

  // Handle socket errors
  const handleError = useCallback((error) => {
    console.error('Socket error:', error);
    if (onError) {
      onError(error);
    }
  }, [onError]);

  // Register event listeners
  useEffect(() => {
    if (!isConnected) return;

    // Register all event listeners
    on('message:new', handleNewMessage);
    on('notification:new-message', handleNotificationNewMessage);
    on('typing:user-typing', handleTypingStart);
    on('typing:user-stopped', handleTypingStop);
    on('message:read-receipt', handleMessageReadReceipt);
    on('conversation:all-read', handleConversationAllRead);
    on('user:online', handleUserOnline);
    on('user:offline', handleUserOffline);
    on('error', handleError);

    // Cleanup function
    return () => {
      off('message:new', handleNewMessage);
      off('notification:new-message', handleNotificationNewMessage);
      off('typing:user-typing', handleTypingStart);
      off('typing:user-stopped', handleTypingStop);
      off('message:read-receipt', handleMessageReadReceipt);
      off('conversation:all-read', handleConversationAllRead);
      off('user:online', handleUserOnline);
      off('user:offline', handleUserOffline);
      off('error', handleError);
    };
  }, [
    isConnected,
    on,
    off,
    handleNewMessage,
    handleNotificationNewMessage,
    handleTypingStart,
    handleTypingStop,
    handleMessageReadReceipt,
    handleConversationAllRead,
    handleUserOnline,
    handleUserOffline,
    handleError
  ]);

  // Return connection status for components to use
  return {
    isConnected
  };
};

export default useChatEvents;
