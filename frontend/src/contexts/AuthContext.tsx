import React, { createContext, useState, useEffect } from "react";

import { getCurrentAdmin } from "../features/admin/admin.service";
import { loginAdmin, logoutAdmin } from "../features/auth/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentAdmin()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    await loginAdmin({ email: email, password: password });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
