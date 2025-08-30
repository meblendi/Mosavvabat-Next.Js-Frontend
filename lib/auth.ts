import { jwtDecode } from 'jwt-decode';

// Helper function to check if we're in the browser
const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

export const setAuthTokens = (tokens: { access: string; refresh: string }) => {
  if (!isBrowser()) return;
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
};

export const getAccessToken = (): string | null => {
  if (!isBrowser()) return null;
  return localStorage.getItem('access_token');
};

export const getRefreshToken = (): string | null => {
  if (!isBrowser()) return null;
  return localStorage.getItem('refresh_token');
};

export const removeAuthTokens = () => {
  if (!isBrowser()) return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const isAuthenticated = (): boolean => {
  if (!isBrowser()) return false;
  const token = getAccessToken();
  return !!token && !isTokenExpired(token);
};