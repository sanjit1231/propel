import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    setToken(storedToken);
    setUserId(storedUserId);
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
    router.push('/login');
  };

  const isAuthenticated = !!token;

  return { token, userId, isLoading, isAuthenticated, logout };
}
