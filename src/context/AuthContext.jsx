import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/auth');
  }, [navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await authService.me();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to fetch user:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token, fetchUser]);

  // Listen for global logout events (from axios interceptor)
  useEffect(() => {
    const handleLogout = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  const login = async (credentials, rememberMe) => {
    try {
      setIsLoading(true);
      const data = await authService.login(credentials);
      const storage = rememberMe ? localStorage : sessionStorage;
      
      storage.setItem('token', data.token);
      setToken(data.token);
      
      // Fetch user profile after login
      await fetchUser();
      
      toast.success('تم تسجيل الدخول بنجاح');
      navigate('/');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      await authService.register(userData);
      toast.success('تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        isAdmin: user?.roles?.includes('Admin') || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
