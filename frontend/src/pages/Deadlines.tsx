import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

const deadlineCards = [
  {
    id: 1,
    title: 'Physics Exam',
    date: 'Tomorrow, Nov 26',
    dateColor: 'text-red-500',
    borderColor: 'border-l-red-500',
    pills: [
      { label: '0 sessions left', bg: 'bg-red-50', textColor: 'text-red-600' },
      { label: 'At Risk', bg: 'bg-red-500', textColor: 'text-white' },
    ],
    showButton: true,
  },
  {
    id: 2,
    title: 'Calculus Assignment',
    date: 'Nov 28',
    dateColor: 'text-orange-500',
    borderColor: 'border-l-orange-400',
    pills: [
      { label: '2 sessions left', bg: 'bg-orange-50', textColor: 'text-orange-600' },
      { label: 'On Track', bg: 'bg-green-500', textColor: 'text-white' },
    ],
    showButton: false,
  },
  {
    id: 3,
    title: 'Essay Final Draft',
    date: 'Dec 3',
    dateColor: 'text-gray-500',
    borderColor: 'border-l-green-500',
    pills: [
      { label: '3 sessions left', bg: 'bg-green-50', textColor: 'text-green-600' },
      { label: 'On Track', bg: 'bg-green-500', textColor: 'text-white' },
    ],
    showButton: false,
  },
  {
    id: 4,
    title: 'History Presentation',
    date: 'Dec 10',
    dateColor: 'text-gray-500',
    borderColor: 'border-l-blue-400',
    pills: [],
    showButton: false,
  },
];

export default function Deadlines() {
  const navigate = useNavigate();

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
          <h1 className="font-bold text-lg text-gray-900">Deadlines</h1>
          <button className="text-blue-600 p-1">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 21v-7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v7" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

        {/* Warning Banner */}
        <motion.div
          className="flex items-center gap-3 bg-orange-50 rounded-xl p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <span className="text-orange-500 text-xl flex-shrink-0">⚠️</span>
          <p className="font-bold text-gray-800 text-sm">2 deadlines in the next 3 days!</p>
        </motion.div>

        {/* Deadline Cards */}
        <div className="space-y-3">
          {deadlineCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${card.borderColor} p-4`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + 0.1 * index, duration: 0.35 }}
            >
              <h3 className="font-bold text-gray-900 text-base">{card.title}</h3>
              <p className={`text-sm font-medium mt-1 ${card.dateColor}`}>{card.date}</p>

              {card.pills.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {card.pills.map((pill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${pill.bg} ${pill.textColor}`}
                    >
                      {pill.label}
                    </span>
                  ))}
                </div>
              )}

              {card.showButton && (
                <button
                  onClick={() => navigate('/ai/loading')}
                  className="w-full mt-3 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm"
                >
                  Start Now
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </MobileContainer>
  );
}