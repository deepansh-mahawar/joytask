"use client";

import React, { createContext, useEffect, useState } from "react";

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: User, remember: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ecom_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (data: User, remember: boolean) => {
    setUser(data);
    if (remember) {
      localStorage.setItem("ecom_user", JSON.stringify(data));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecom_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
