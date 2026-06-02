import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

type Tab = 'all' | 'unread';

type NotificationItem = {
  id: number;
  icon: string;
  iconBg: string;
  title: string;
  body: string;
  time: string;
  group: 'today' | 'yesterday';
  navigateTo?: string;
};

const notifications: NotificationItem[] = [
  {
    id: 0,
    icon: '🤖',
    iconBg: 'bg-blue-100',
    title: 'Study plan ready!',
    body: 'Your Calculus study plan has been generated',
    time: '2 min ago',
    group: 'today',
    navigateTo: '/ai/result',
  },
  {
    id: 1,
    icon: '⚠️',
    iconBg: 'bg-orange-100',
    title: 'Deadline approaching!',
    body: 'Physics Exam is due tomorrow',
    time: '1 hr ago',
    group: 'today',
    navigateTo: '/deadlines',
  },
  {
    id: 2,
    icon: '✅',
    iconBg: 'bg-green-100',
    title: 'Session completed!',
    body: 'You completed Limits & Derivatives session',
    time: '3 hrs ago',
    group: 'today',
  },
  {
    id: 3,
    icon: '🔥',
    iconBg: 'bg-orange-100',
    title: '5-day streak!',
    body: "Amazing! You've studied 5 days in a row",
    time: 'Yesterday',
    group: 'yesterday',
    navigateTo: '/success',
  },
  {
    id: 4,
    icon: '📅',
    iconBg: 'bg-blue-100',
    title: 'Study reminder',
    body: 'Time for your 2:00 PM study session',
    time: 'Yesterday',
    group: 'yesterday',
  },
];

const navItems: { label: string; path: string; active?: boolean }[] = [
  { label: 'Home', path: '/dashboard' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Progress', path: '/progress' },
  { label: 'Profile', path: '/settings' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [readState, setReadState] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: true,
    3: true,
    4: true,
  });

  const markAsRead = (id: number) => {
    setReadState((prev) => ({ ...prev, [id]: true }));
  };

  const markAllRead = () => {
    const allRead: Record<number, boolean> = {};
    notifications.forEach((n) => {
      allRead[n.id] = true;
    });
    setReadState(allRead);
  };

  const hasUnread = notifications.some((n) => !readState[n.id]);

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((n) => !readState[n.id])
      : notifications;

  const todayNotifications = filteredNotifications.filter((n) => n.group === 'today');
  const yesterdayNotifications = filteredNotifications.filter((n) => n.group === 'yesterday');
  const isEmpty = filteredNotifications.length === 0;

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-gray-50">
      <motion.div
        className="flex-1 overflow-y-auto px-4 pt-6 pb-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      >
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-xl text-gray-700 p-1">
            ←
          </button>
          <h1 className="font-bold text-lg text-gray-900">Notifications</h1>
          <button
            onClick={markAllRead}
            className="text-sm font-semibold text-blue-600"
          >
            Mark all read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-500'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              activeTab === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-500'
            }`}
          >
            Unread
          </button>
        </div>

        {/* Empty State */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-4xl text-gray-300 mb-3">🔔</span>
            <p className="text-sm text-gray-400">No unread notifications</p>
          </div>
        )}

        {/* Today Group */}
        {!isEmpty && todayNotifications.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
              Today
            </p>
            <div className="space-y-2">
              {todayNotifications.map((item, index) => {
                const isUnread = !readState[item.id];
                return (
                  <motion.button
                    key={item.id}
                    className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-3 text-left"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 * index }}
                    onClick={() => {
                      markAsRead(item.id);
                      if (item.navigateTo) navigate(item.navigateTo);
                    }}
                  >
                    {/* Blue dot indicator for unread */}
                    {isUnread && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                    {!isUnread && <div className="w-2 flex-shrink-0" />}

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.body}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Yesterday Group */}
        {!isEmpty && yesterdayNotifications.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
              Yesterday
            </p>
            <div className="space-y-2">
              {yesterdayNotifications.map((item, index) => {
                const isUnread = !readState[item.id];
                return (
                  <motion.button
                    key={item.id}
                    className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-start gap-3 text-left"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.08 * (todayNotifications.length + index),
                    }}
                    onClick={() => {
                      markAsRead(item.id);
                      if (item.navigateTo) navigate(item.navigateTo);
                    }}
                  >
                    {/* Blue dot indicator for unread */}
                    {isUnread && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    )}
                    {!isUnread && <div className="w-2 flex-shrink-0" />}

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.body}</p>
                      <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

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