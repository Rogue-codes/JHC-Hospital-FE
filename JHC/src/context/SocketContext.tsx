import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";

interface User {
  _id: string;
  // Add other user properties here as needed
}

interface RootState {
  auth: {
    user: User | null;
  };
}

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: User[];
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: User[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
