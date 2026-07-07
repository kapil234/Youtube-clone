import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { getMyChannel } from "../services/channelApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [hasChannel, setHasChannel] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkChannel = async (token) => {
    if (!token) {
      setHasChannel(false);
      return;
    }

    try {
      await getMyChannel(token);
      setHasChannel(true);
    } catch (err) {
      setHasChannel(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      if (user?.token) {
        await checkChannel(user.token);
      }

      setLoading(false);
    };

    initialize();
  }, [user]);

  const login = (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setHasChannel(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        hasChannel,
        setHasChannel,
        checkChannel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);