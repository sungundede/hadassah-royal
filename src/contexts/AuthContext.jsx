import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE, authHeaders, handleResponse } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("hr_token"));
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async (tokenValue) => {
    const response = await fetch(`${API_BASE}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(tokenValue),
      },
    });
    return handleResponse(response);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (token) {
        try {
          const currentUser = await fetchUser(token);
          setUser(currentUser);
        } catch (error) {
          console.error("Auth initialization failed:", error);
          localStorage.removeItem("hr_token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initialize();
  }, [token, fetchUser]);

  const login = useCallback(
    async (email, password) => {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleResponse(response);
      localStorage.setItem("hr_token", data.access_token);
      setToken(data.access_token);
      const currentUser = await fetchUser(data.access_token);
      setUser(currentUser);
      return currentUser;
    },
    [fetchUser]
  );

  const register = useCallback(
    async (name, email, password) => {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      await handleResponse(response);
      return login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("hr_token");
    setToken(null);
    setUser(null);
  }, []);

  const authFetch = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${API_BASE}${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token),
          ...(options.headers || {}),
        },
        method: options.method || "GET",
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      return handleResponse(response);
    },
    [token]
  );

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, authFetch }),
    [user, token, loading, login, register, logout, authFetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
