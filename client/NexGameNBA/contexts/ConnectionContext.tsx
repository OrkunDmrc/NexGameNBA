import React, { createContext, ReactNode, useState } from 'react';

interface ConnectionContextType {
  isConnected: boolean | null;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

interface ConnectionProviderProps {
  children: ReactNode;
}

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  return (
    <ConnectionContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </ConnectionContext.Provider>
  );
};
