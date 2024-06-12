import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

interface AuthContextType {
  isAuthenticated: boolean;
  login: ({ token, email } : { token: string, email: string}) => void;
  logout: () => void;
}

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}