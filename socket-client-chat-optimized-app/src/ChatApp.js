import React from 'react';
import { AuthProvider } from './context/auth/AuthContext';
import { SocketProvider } from './context/socket/SocketContext';
import { ChatProvider } from './context/chat/ChatContext';
import { AppRouter } from './router/AppRouter';

export const ChatApp = () => {
    return (
        <div>
            <ChatProvider>
                <AuthProvider>
                    <SocketProvider>
                        <AppRouter />
                    </SocketProvider>
                </AuthProvider>
            </ChatProvider>
        </div>
    )
}
