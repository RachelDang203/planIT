import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

const badges = [
  { emoji: '🔥', label: '5-Day Streak' },
  { emoji: '📚', label: 'Study Master' },
  { emoji: '⚡', label: 'Quick Learner' },
];

const sunAnimation = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.15, 1],
  },
  transition: {
    rotate: { duration: 8, repeat: Infinity, ease: 'linear' as const },
    scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

export default function Success() {
  const navigate = useNavigate();

  return (
    <MobileContainer className="flex flex-col min-h-screen bg-white">
      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
      >
        {/* Decorative dots */}
        <div className="absolute top-8 left-6 w-3 h-3 rounded-full bg-blue-400 opacity-50" />
        <div className="absolute top-12 right-10 w-2 h-2 rounded-full bg-green-400 opacity-50" />
        <div className="absolute bottom-20 left-8 w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-50" />
        <div className="absolute bottom-32 right-6 w-3 h-3 rounded-full bg-blue-300 opacity-50" />

        {/* Animated Sun */}
        <motion.div
          className="text-6xl mb-6"
          animate={sunAnimation.animate}
          transition={sunAnimation.transition}
        >
          ☀️
        </motion.div>

        {/* Title + Subtitle */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          You're on track! 🎉
        </h1>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Great work this week, Alex!
        </p>

        {/* Blue Stats Card */}
        <motion.div
          className="w-full bg-[#4A90E2] rounded-xl py-5 px-4 mt-6 flex items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' as const }}
        >
          <div className="flex-1 flex flex-col items-center">
            <span className="text-xl font-bold text-white">5</span>
            <span className="text-[11px] text-white/80 mt-0.5">days streak</span>
          </div>
          <div className="h-10 w-px bg-white/30" />
          <div className="flex-1 flex flex-col items-center">
            <span className="text-xl font-bold text-white">18</span>
            <span className="text-[11px] text-white/80 mt-0.5">hrs this week</span>
          </div>
          <div className="h-10 w-px bg-white/30" />
          <div className="flex-1 flex flex-col items-center">
            <span className="text-xl font-bold text-white">94%</span>
            <span className="text-[11px] text-white/80 mt-0.5">completion</span>
          </div>
        </motion.div>

        {/* Quote Section */}
        <div className="mt-8 flex flex-col items-center px-4">
          <span className="text-4xl text-gray-200 leading-none">"</span>
          <p className="text-sm text-gray-400 italic text-center mt-1 leading-relaxed max-w-xs">
            Success is the sum of small efforts repeated day in and day out.
          </p>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {badges.map((badge, index) => (
            <motion.span
              key={badge.label}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-600"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + 0.1 * index }}
            >
              <span>{badge.emoji}</span>
              {badge.label}
            </motion.span>
          ))}
        </div>

        {/* Primary Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full mt-8 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm"
        >
          Keep it up!
        </button>

        {/* Link */}
        <button
          onClick={() => navigate('/progress')}
          className="mt-4 text-sm text-gray-400 underline text-center"
        >
          View full stats
        </button>
      </motion.div>
    </MobileContainer>
  );
}