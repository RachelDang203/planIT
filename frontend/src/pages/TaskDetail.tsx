import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

export default function TaskDetail() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' as const },
  };

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-gray-50">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4 space-y-4">
        {/* Header Row */}
        <motion.div className="flex items-center justify-between" {...fadeIn}>
          <button onClick={() => navigate(-1)} className="text-xl text-gray-700 p-1">
            ←
          </button>
          <h1 className="font-bold text-lg text-gray-900">Task Details</h1>
          <button className="text-xl text-gray-700 p-1">⋮</button>
        </motion.div>

        {/* Task Icon + Title */}
        <motion.div className="flex items-center gap-4" {...fadeIn}>
          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
            📚
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Calculus: Limits Review</h2>
            <p className="text-sm text-gray-400">Calculus · Chapter 3</p>
          </div>
        </motion.div>

        {/* Tag Pills */}
        <motion.div className="flex gap-2 flex-wrap" {...fadeIn}>
          <span className="px-3 py-1 text-xs font-medium border border-blue-500 text-blue-600 rounded-full">
            In Progress
          </span>
          <span className="px-3 py-1 text-xs font-medium border border-orange-400 text-orange-500 rounded-full">
            Medium Priority
          </span>
        </motion.div>

        {/* Stats Grid 2x2 */}
        <motion.div className="grid grid-cols-2 gap-3" {...fadeIn}>
          {[
            { label: 'Duration', value: '2 hrs' },
            { label: 'Due Date', value: 'Nov 25' },
            { label: 'Sessions Left', value: '3 of 6' },
            { label: 'Study Method', value: 'Practice' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Description Card */}
        <motion.div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100" {...fadeIn}>
          <h3 className="font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Review sections 3.1-3.4 focusing on epsilon-delta definitions and derivative rules.
            Complete 15 practice problems from the textbook.
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100" {...fadeIn}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-900">Your Progress</span>
            <span className="text-blue-600 font-semibold">45%</span>
          </div>
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '45%' }}
              transition={{ duration: 1, ease: 'easeOut' as const }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">3 sessions completed</p>
        </motion.div>

        {/* AI Suggestions Card */}
        <motion.div className="bg-blue-50 rounded-xl p-4" {...fadeIn}>
          <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full mb-3">
            ✦ AI SUGGESTIONS
          </span>
          <h3 className="font-bold text-gray-900 mb-2">Recommendations for you</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                Focus on epsilon-delta proofs in your next session—they're commonly tested
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                Try breaking this into 45-minute focused sessions with 10-minute breaks
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>
                Review your notes from Lecture 5 before starting practice problems
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Spacer so content isn't hidden behind sticky buttons */}
        <div className="h-4" />
      </div>

      {/* Sticky Bottom Buttons */}
      <div className="sticky bottom-0 bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/task/new')}
            className="flex-1 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm"
          >
            Edit Task
          </button>
          <button
            onClick={() => navigate('/ai/loading')}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm"
          >
            Start Studying
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}