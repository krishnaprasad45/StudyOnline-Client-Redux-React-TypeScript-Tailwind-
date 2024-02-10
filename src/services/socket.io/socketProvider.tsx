import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket | null => {
  const socket = useContext(SocketContext);
  return socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const socket = useMemo(() => io('http://13.126.248.71'), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
