import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export function useAuth() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      setUser(jwtDecode(t));
    }
  }, []);

  function login(token) {
    setToken(token);
    setUser(jwtDecode(token));
    localStorage.setItem('token', token);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }

  return { token, user, login, logout };
}
