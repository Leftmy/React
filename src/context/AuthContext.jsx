import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const mockUsers = [
    { login: "admin", password: "1234", role: "admin" },
    { login: "user", password: "1111", role: "user" },
  ];

  const login = (login, password) => {
    const found = mockUsers.find(
      u => u.login === login && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
