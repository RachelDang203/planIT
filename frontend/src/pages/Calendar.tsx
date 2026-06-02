import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const dotColors: Record<string, string> = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
};

const dotData: { date: number; dots: string[] }[] = [
  { date: 1, dots: ['blue', 'blue'] },
  { date: 4, dots: ['blue'] },
  { date: 5, dots: ['blue', 'green', 'orange'] },
  { date: 7, dots: ['blue', 'orange'] },
  { date: 11, dots: ['red'] },
  { date: 12, dots: ['green', 'blue'] },
  { date: 18, dots: ['orange'] },
  { date: 19, dots: ['blue', 'purple', 'green'] },
  { date: 22, dots: ['green'] },
  { date: 25, dots: ['blue', 'blue', 'blue', 'blue'] },
  { date: 29, dots: ['blue'] },
  { date: 30, dots: ['red'] },
];

const todayDate = 25;
const todayMonth = 10; // 0-indexed, November = 10
const todayYear = 2024;

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const events = [
  {
    time: '9:00 AM',
    title: 'Mathematics Study Session',
    duration: '1 hour 30 minutes',
    borderColor: 'border-l-blue-500',
  },
  {
    time: '11:00 AM',
    title: 'History Review',
    duration: '45 minutes',
    borderColor: 'border-l-orange-500',
  },
  {
    time: '2:00 PM',
    title: 'Science Lab Report',
    duration: '2 hours',
    borderColor: 'border-l-green-500',
  },
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2024, 10, 1));
  const [selectedDate, setSelectedDate] = useState<number>(25);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month - 1);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
  const goToToday = () => {
    setCurrentMonth(new Date(2024, 10, 1));
    setSelectedDate(25);
  };

  const getDotsForDate = (date: number): string[] => {
    const entry = dotData.find((d) => d.date === date);
    return entry ? entry.dots : [];
  };

  const isToday = (date: number) =>
    date === todayDate && month === todayMonth && year === todayYear;

  // Build calendar grid
  const grid: (number | null)[] = [];

  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    grid.push(-(daysInPrevMonth - i));
  }

  // Current month's days
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push(d);
  }

  // Next month's leading days
  const remaining = 42 - grid.length;
  for (let i = 1; i <= remaining; i++) {
    grid.push(-i);
  }

  const getDayName = (day: number): string => {
    const date = new Date(year, month, day);
    return dayNames[date.getDay()];
  };

  const formatMonthYear = `${monthNames[month]} ${year}`;

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-gray-50">
      <motion.div
        className="flex-1 overflow-y-auto pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
      >
        {/* Header */}
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={prevMonth} className="text-xl text-gray-600 p-1">
            ‹
          </button>
          <span className="font-bold text-gray-900">{formatMonthYear}</span>
          <div className="flex items-center gap-2">
            <button onClick={nextMonth} className="text-xl text-gray-600 p-1">
              ›
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm font-semibold text-blue-600 bg-gray-100 rounded-full"
            >
              Today
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="px-3 py-2">
          {/* Week day headers */}
          <div className="grid grid-cols-7 mb-1">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs text-gray-400 font-medium py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7">
            {grid.map((date, index) => {
              if (date === null) return <div key={index} className="aspect-square" />;

              const isCurrentMonth = date > 0;
              const absDate = Math.abs(date);
              const dateDots = isCurrentMonth ? getDotsForDate(absDate) : [];
              const isTodayDate = isCurrentMonth && isToday(absDate);
              const isSelected = isCurrentMonth && selectedDate === absDate;

              return (
                <button
                  key={index}
                  onClick={() => isCurrentMonth && setSelectedDate(absDate)}
                  disabled={!isCurrentMonth}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative ${
                    !isCurrentMonth
                      ? 'text-gray-300 cursor-default'
                      : isTodayDate
                      ? 'text-white'
                      : isSelected
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {isTodayDate ? (
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      {absDate}
                    </div>
                  ) : (
                    <div className={`w-9 h-9 flex items-center justify-center rounded-full ${
                      isSelected ? 'bg-blue-100 font-bold text-blue-600' : ''
                    }`}>
                      {absDate}
                    </div>
                  )}
                  {dateDots.length > 0 && (
                    <div className="flex gap-[2px] mt-0.5">
                      {dateDots.slice(0, 4).map((color, i) => (
                        <span
                          key={i}
                          className={`w-1 h-1 rounded-full ${dotColors[color] || 'bg-blue-500'}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Section */}
        <div className="px-4 pt-4 pb-4">
          <h2 className="font-bold text-gray-900 text-lg mb-3">
            {getDayName(selectedDate)}, {monthNames[month]} {selectedDate}
          </h2>

          <div className="space-y-3">
            {events.map((event, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-xs text-gray-400 font-medium pt-3 w-16 flex-shrink-0 text-right">
                  {event.time}
                </span>
                <div
                  className={`flex-1 bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${event.borderColor} p-3`}
                >
                  <p className="text-sm font-bold text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{event.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating + Button */}
      <button
        onClick={() => navigate('/task/new')}
        className="fixed bottom-24 right-5 z-30 w-14 h-14 bg-blue-600 text-white text-3xl font-light rounded-full shadow-[0_8px_20px_rgba(74,144,226,0.4)] flex items-center justify-center"
      >
        +
      </button>

    </MobileContainer>
  );
}