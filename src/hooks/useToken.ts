// hooks/useToken.ts
import { useEffect, useState } from 'react';

export function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para ler cookie específico
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null; // SSR safety
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  // Função para definir cookie
  const setCookie = (name: string, value: string, days: number = 1) => {
    if (typeof document === 'undefined') return; // SSR safety
    
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  // Função para remover cookie
  const removeCookie = (name: string) => {
    if (typeof document === 'undefined') return; // SSR safety
    
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  // Carrega o token quando o componente monta
  useEffect(() => {
    const tokenFromCookie = getCookie('token');

    console.log('--------tokenFromCookie')
    console.log(tokenFromCookie)
    console.log('--------tokenFromCookie')

    setToken(tokenFromCookie);
    setLoading(false);
  }, []);

  // Função para atualizar o token
  const updateToken = (newToken: string | null) => {
    if (newToken) {
      setCookie('token', newToken, 1); // 1 dia
      setToken(newToken);
    } else {
      removeCookie('token');
      setToken(null);
    }
  };

  // Função para fazer logout
  const logout = () => {
    removeCookie('token');
    setToken(null);
    // Opcional: redirecionar para login
    window.location.href = '/';
  };

  return {
    token,
    loading,
    updateToken,
    logout,
    isAuthenticated: !!token
  };
}
