import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser, getToken, isAuthenticated, logout as logoutService } from "../services/authService";

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginSuccess: (user: User, token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getCurrentUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const loginSuccess = (user: User, token: string) => {
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginSuccess,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
