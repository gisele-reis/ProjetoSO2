import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: ({ token, email }: { token: string, email: string }) => void;
    logout: () => void;
  }

  export const AuthContext = createContext<AuthContextType | undefined>(undefined);

  export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const storedUser = localStorage.getItem('token');
      return !!storedUser;
    });
    const navigate = useNavigate();
  
    const login = useCallback(({ token, email}: { token: string, email: string }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      setIsAuthenticated(true);
    }, []);
  
    const logout = useCallback(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/login');
      setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{
          isAuthenticated,
          login,
          logout
        }}>
          {children}
        </AuthContext.Provider>
      )
  }