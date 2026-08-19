
import { createContext, useContext, useState } from "react";

// ----------------------------------------------------------------------


interface User {
  id: number;
  name: string;
  email: string;
}


// ----------------------------------------------------------------------

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// ----------------------------------------------------------------------

interface AuthProviderProps {
  children: React.ReactNode
}

// ----------------------------------------------------------------------


const AuthContext = createContext<AuthContextType | null>(null)
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth(): AuthContextType {

  const context = useContext(AuthContext)

  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context

}
