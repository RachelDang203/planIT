import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useSettingsStore } from '../store/settings';
import { useUserStore } from '../store/user';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#4A90E2]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

const navItems: { label: string; path: string; active?: boolean }[] = [
  { label: 'Home', path: '/dashboard' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Progress', path: '/progress' },
  { label: 'Profile', path: '/settings', active: true },
];

export default function Settings() {
  const navigate = useNavigate();
  const settings = useSettingsStore();
  const user = useUserStore();

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-gray-50">
      <motion.div
        className="flex-1 overflow-y-auto px-4 pt-6 pb-6 space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      >
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
            <span className="text-xl font-bold text-white">AJ</span>
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
          <button className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm">
            Edit Profile
          </button>
        </div>

        {/* Notifications Section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
            Notifications
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔔</span>
                <span className="text-sm font-medium text-gray-800">Push Notifications</span>
              </div>
              <Toggle enabled={settings.pushNotifications} onChange={() => settings.toggle('pushNotifications')} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">📅</span>
                <span className="text-sm font-medium text-gray-800">Daily Reminders</span>
              </div>
              <Toggle enabled={settings.dailyReminders} onChange={() => settings.toggle('dailyReminders')} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">⏰</span>
                <span className="text-sm font-medium text-gray-800">Session Reminders</span>
              </div>
              <Toggle enabled={settings.sessionReminders} onChange={() => settings.toggle('sessionReminders')} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-medium text-gray-800">Achievement Alerts</span>
              </div>
              <Toggle enabled={settings.achievementAlerts} onChange={() => settings.toggle('achievementAlerts')} />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">⏱️</span>
                <span className="text-sm font-medium text-gray-800">Reminder Time</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{settings.reminderTime} ›</span>
            </div>
          </div>
        </div>

        {/* Study Preferences Section */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
            Study Preferences
          </p>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="text-lg">🎯</span>
                <span className="text-sm font-medium text-gray-800">Daily Study Goal</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">{settings.dailyStudyGoal} hours ›</span>
            </div>
          </div>
        </div>

        <div className="h-4" />
      </motion.div>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200 px-4 pt-2 pb-4 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const isActive = item.active;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {item.label === 'Home' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M3 10.5 12 3l9 7.5V21H5V10.5Z" strokeLinejoin="round" />
                  </svg>
                )}
                {item.label === 'Tasks' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4h10v3H7zM6 8h12v12H6z" />
                    <path d="M9 12h6M9 16h6" strokeLinecap="round" />
                  </svg>
                )}
                {item.label === 'Calendar' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16v15H4z" />
                    <path d="M4 10h16M8 3v5M16 3v5" />
                  </svg>
                )}
                {item.label === 'Progress' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {item.label === 'Profile' && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0H4Z" />
                  </svg>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </MobileContainer>
  );
}