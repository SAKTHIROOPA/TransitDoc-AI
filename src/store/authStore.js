import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, decodeJwt } from '../services/authService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loginLoading: false,
      loginError: null,

      login: async (email, password) => {
        set({ loginLoading: true, loginError: null });
        try {
          const res = await loginUser(email, password);
          set({
            token: res.token,
            user: res.user,
            isAuthenticated: true,
            loginLoading: false,
            loginError: null,
          });
          return true;
        } catch (err) {
          set({
            loginLoading: false,
            loginError: err.message || "Failed to authenticate.",
          });
          return false;
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          loginError: null,
        });
      },

      getDecodedToken: () => {
        const { token } = get();
        return decodeJwt(token);
      },

      checkTokenValidity: () => {
        const { token } = get();
        if (!token) return false;
        const decoded = decodeJwt(token);
        if (!decoded || decoded.isExpired) {
          get().logout();
          return false;
        }
        return true;
      }
    }),
    {
      name: 'transitdoc-auth-storage',
    }
  )
);
