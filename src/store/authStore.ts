import { create } from 'zustand';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: (user) => {
    localStorage.setItem('auth_user', JSON.stringify(user));
    set({
      user,
      isAuthenticated: true,
      isAdmin: user.role === 'admin'
    });
  },
  logout: () => {
    localStorage.removeItem('auth_user');
    set({
      user: null,
      isAuthenticated: false,
      isAdmin: false
    });
  },
  initialize: () => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        set({
          user,
          isAuthenticated: true,
          isAdmin: user.role === 'admin'
        });
      } catch (error) {
        console.error('Failed to parse saved user from localStorage', error);
        localStorage.removeItem('auth_user');
      }
    }
  }
}));
