import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  pushNotifications: boolean;
  dailyReminders: boolean;
  sessionReminders: boolean;
  achievementAlerts: boolean;
  reminderTime: string;
  dailyStudyGoal: number;
  toggle: (key: keyof Omit<SettingsStore, 'toggle' | 'reminderTime' | 'dailyStudyGoal' | 'setReminderTime' | 'setGoal'>) => void;
  setReminderTime: (time: string) => void;
  setGoal: (hours: number) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      pushNotifications: true,
      dailyReminders: true,
      sessionReminders: true,
      achievementAlerts: false,
      reminderTime: '8:00 AM',
      dailyStudyGoal: 3,
      toggle: (key) => set((state) => ({ [key]: !state[key] })),
      setReminderTime: (time) => set({ reminderTime: time }),
      setGoal: (hours) => set({ dailyStudyGoal: hours }),
    }),
    { name: 'planit-settings' },
  ),
);