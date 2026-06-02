import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userId: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  setUser: (userId: string, name: string, email: string) => void;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userId: '',
      name: 'Alex Johnson',
      email: 'alex@email.com',
      isLoggedIn: false,
      setUser: (userId, name, email) => set({ userId, name, email }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, userId: '', name: '', email: '' }),
    }),
    { name: 'planit-user' },
  ),
);
