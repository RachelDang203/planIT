import { motion } from 'framer-motion';
import { useState } from 'react';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';

type Tab = 'week' | 'month' | 'all';

const tabs: { key: Tab; label: string }[] = [
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'all', label: 'All Time' },
];

const barData = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 1.5 },
  { day: 'Fri', hours: 0.5 },
  { day: 'Sat', hours: 0.2 },
  { day: 'Sun', hours: 0 },
];

const maxHours = 3;

const subjects = [
  {
    name: 'Calculus',
    hours: '4.5h',
    color: '#4A90E2',
    percent: 75,
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h10v2H4z" />
      </svg>
    ),
  },
  {
    name: 'Physics',
    hours: '3h',
    color: '#8B5CF6',
    percent: 50,
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'History',
    hours: '2h',
    color: '#F59E0B',
    percent: 33,
    icon: (
      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
];

export default function Progress() {
  const [activeTab, setActiveTab] = useState<Tab>('week');
  const tasks = useTaskStore((s) => s.tasks);

  const doneTasks = tasks.filter((t) => t.done);
  const totalHours = doneTasks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-gray-50">
      <motion.div
        className="flex-1 overflow-y-auto px-4 pt-6 pb-4 space-y-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>

        {/* Tab Row */}
        <div className="flex gap-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <svg className="h-6 w-6 text-blue-500 mb-1" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-lg font-bold text-gray-900">{totalHours} hrs</p>
            <p className="text-xs text-gray-400">Studied</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <svg className="h-6 w-6 text-green-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p className="text-lg font-bold text-gray-900">{doneTasks.length} tasks</p>
            <p className="text-xs text-gray-400">Done</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <svg className="h-6 w-6 text-orange-500 mb-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c3.86 0 7-3.14 7-7 0-3.86-7-13-7-13S5 11.14 5 15c0 3.86 3.14 7 7 7z" />
            </svg>
            <p className="text-lg font-bold text-gray-900">4 day</p>
            <p className="text-xs text-gray-400">Streak</p>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Study Hours This Week</h3>
          <div className="flex items-stretch gap-1 h-44">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between text-xs text-gray-400 pr-2 pb-6">
              <span>3h</span>
              <span>2h</span>
              <span>1h</span>
              <span>0h</span>
            </div>
            {/* Bars */}
            <div className="flex-1 flex items-end gap-2 pb-6">
              {barData.map((bar, index) => {
                const heightPercent = (bar.hours / maxHours) * 100;
                return (
                  <div key={bar.day} className="flex-1 flex flex-col items-center justify-end h-full">
                    <motion.div
                      className="w-full rounded-t-md"
                      style={{ backgroundColor: '#4A90E2' }}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6, delay: 0.1 * index, ease: 'easeOut' as const }}
                    />
                    <span className="text-xs text-gray-400 mt-1">{bar.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* By Subject */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">By Subject</h3>
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.icon}
                  </div>
                  <span className="font-bold text-gray-900 flex-1">{subject.name}</span>
                  <span className="text-sm text-gray-400">{subject.hours}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: subject.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${subject.percent}%` }}
                    transition={{ duration: 0.8, delay: 0.15 * index, ease: 'easeOut' as const }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </motion.div>

    </MobileContainer>
  );
}