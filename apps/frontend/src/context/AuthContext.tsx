import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import type { UserRole, RegisterRequestDTO, LoginRequestDTO } from '../types';
import { api, apiNonSecure, setAuthToken, setUnauthorizedInterceptor } from '../api/axios';
import { API_ROUTES } from '../constants/apiRoutes';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (credentials: LoginRequestDTO) => Promise<void>;
  register: (userData: RegisterRequestDTO) => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string | null, role: UserRole | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setAccessToken = useCallback((token: string | null, role: UserRole | null) => {
    setAuthToken(token);
    setAccessTokenState(token);
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const logout = useCallback(async () => {
    console.log('logout')
    try {
      await api.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setAccessToken(null, null);
      localStorage.removeItem('trueSeatsToken')
    }
  }, [setAccessToken]);

  const checkAuthStatus = useCallback(async () => {
    const refreshToken = localStorage.getItem('trueSeatsToken');
    if (!refreshToken) {
      setAccessToken(null, null);
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.post(API_ROUTES.AUTH.REFRESH_TOKEN, {}, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      const { accessToken: newAccessToken, userRole: newUserRole } = response.data;
      setAccessToken(newAccessToken, newUserRole);
    } catch {
      setAccessToken(null, null);
      localStorage.removeItem('trueSeatsToken');
    } finally {
      setIsLoading(false);
    }
  }, [setAccessToken]);
  
  useEffect(() => {
    setUnauthorizedInterceptor(logout);
    checkAuthStatus();
  }, [logout, checkAuthStatus]);

  const login = useCallback(async (credentials: LoginRequestDTO) => {
    try {
      const response = await apiNonSecure.post(API_ROUTES.AUTH.LOGIN, credentials);
      const { accessToken: newAccessToken, refreshToken: refresh, user } = response.data;

      setAccessToken(newAccessToken, user.role);
      localStorage.setItem('trueSeatsToken', refresh)

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [setAccessToken]);

  const register = useCallback(async (userData: RegisterRequestDTO) => {
    try {
      await apiNonSecure.post(API_ROUTES.AUTH.REGISTER, userData);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({ isAuthenticated, userRole, accessToken, isLoading, login, register, logout, setAccessToken }),
    [isAuthenticated, userRole, accessToken, isLoading, login, register, logout, setAccessToken]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
