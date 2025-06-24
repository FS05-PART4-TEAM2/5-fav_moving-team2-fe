import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const url = process.env.NEXT_PUBLIC_API_URL;

export function useNotificationSocket(token: string | null, onNew: (payload: any) => void) {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    if (!token) return;
    const socket = io(`${url}/sockets/notifications`, {
      query: { token },
    });
    socket.on('newNotification', onNew);
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, [token, onNew]);

  return socketRef.current;
}
