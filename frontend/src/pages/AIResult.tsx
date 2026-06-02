import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';

type Session = {
  date: string;
  title: string;
  duration: string;
  tag: string;
};

const sessions: Session[] = [
  { date: 'MONDAY, NOV 23', title: 'Limits & Derivatives', duration: '2h', tag: 'Introduction' },
  { date: 'TUESDAY, NOV 24', title: 'Derivative Rules', duration: '2h', tag: 'Core Concepts' },
  { date: 'WEDNESDAY, NOV 25', title: 'Chain Rule & Applications', duration: '2h', tag: 'Advanced' },
  { date: 'THURSDAY, NOV 26', title: 'Implicit Differentiation', duration: '2h', tag: 'Practice' },
  { date: 'FRIDAY, NOV 27', title: 'Related Rates Problems', duration: '2h', tag: 'Application' },
  { date: 'SATURDAY, NOV 28', title: 'Review & Practice Test', duration: '2h', tag: 'Review' },
];

const stats = [
  { value: '6', label: 'Sessions' },
  { value: '2h', label: 'Per Day' },
  { value: '85%', label: 'Ready' },
];

export default function AIResult() {
  const navigate = useNavigate();
  const draft = useTaskStore((s) => s.draft);
  const subjectName = draft.subject || 'Untitled Task';
  const deadlineDisplay = draft.deadline ? `Due ${draft.deadline}` : 'Due date not set';

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="flex min-h-screen flex-col bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <header className="flex h-[76px] items-center justify-between border-b border-[#EEF0F4] px-7">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-start text-[36px] font-light leading-none text-[#111827]"
          >
            ‹
          </button>
          <h1 className="text-center text-[25px] font-extrabold tracking-[-0.045em] text-[#111827]">
            Your Study Plan
          </h1>
          <button
            type="button"
            aria-label="Share study plan"
            className="flex h-10 w-10 items-center justify-end text-primary"
          >
            <ShareIcon />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-4 pt-7">
          <section className="rounded-[22px] bg-primary px-6 py-8 text-white shadow-[0_14px_24px_rgba(74,144,226,0.22)]">
            <h2 className="text-[26px] font-extrabold tracking-[-0.045em]">{subjectName}</h2>
            <div className="mt-4 flex items-center gap-2 text-[17px] font-bold tracking-[-0.025em] text-white/90">
              <CalendarIcon />
              <span>{deadlineDisplay} · 6 sessions · 12 hrs total</span>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-[88px] flex-col items-center justify-center rounded-xl border border-[#EEF0F4] bg-white shadow-[0_10px_24px_rgba(32,32,51,0.06)]"
              >
                <span className="text-[28px] font-extrabold tracking-[-0.04em] text-[#111827]">
                  {stat.value}
                </span>
                <span className="mt-2 text-[15px] font-medium tracking-[-0.02em] text-[#6B7280]">
                  {stat.label}
                </span>
              </div>
            ))}
          </section>

          <h2 className="mt-9 text-[23px] font-extrabold tracking-[-0.045em] text-[#111827]">
            Recommended Schedule
          </h2>

          <motion.section
            className="mt-5 space-y-4 pb-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
            }}
          >
            {sessions.map((session, index) => (
              <SessionCard
                key={session.date}
                session={session}
                onStart={() => navigate(`/ai/detail?index=${index}`)}
              />
            ))}
          </motion.section>

          <div className="mb-8 mt-8 flex items-start gap-4 rounded-xl border border-[#D6E9FA] bg-[#EEF8FF] px-5 py-5 text-primary">
            <StarIcon />
            <p className="text-[18px] font-bold leading-7 tracking-[-0.025em]">
              Sessions adjusted for your current knowledge level and learning pace
            </p>
          </div>
        </main>

        <footer className="sticky bottom-0 z-20 bg-white px-5 pb-8 pt-3 shadow-[0_-14px_30px_rgba(255,255,255,0.94)]">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="h-[64px] w-full rounded-xl bg-primary text-[20px] font-extrabold tracking-[-0.03em] text-white shadow-[0_14px_28px_rgba(74,144,226,0.32)] transition active:scale-[0.99]"
          >
            Accept Plan
          </button>
          <div className="mx-auto mt-9 h-1 w-[134px] rounded-full bg-[#202033]/35" />
        </footer>
      </motion.div>
    </MobileContainer>
  );
}

function SessionCard({ session, onStart }: { session: Session; onStart: () => void }) {
  return (
    <motion.article
      className="rounded-[20px] border border-[#EEF0F4] bg-white px-5 py-6 shadow-[0_8px_20px_rgba(32,32,51,0.05)]"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-extrabold uppercase tracking-[0.04em] text-[#777D87]">
            {session.date}
          </p>
          <h3 className="mt-3 text-[20px] font-extrabold tracking-[-0.045em] text-[#111827]">
            {session.title}
          </h3>
        </div>
        <span className="mt-8 rounded-lg bg-[#F7F9FC] px-4 py-2 text-[16px] font-extrabold text-primary">
          {session.duration}
        </span>
      </div>

      <span className="mt-5 inline-flex rounded-lg bg-[#EEF5FF] px-3 py-1 text-[15px] font-medium tracking-[-0.02em] text-[#4D87BF]">
        {session.tag}
      </span>

      <button
        type="button"
        onClick={onStart}
        className="mt-5 h-[60px] w-full rounded-xl bg-primary text-[18px] font-extrabold tracking-[-0.025em] text-white shadow-[0_10px_20px_rgba(74,144,226,0.28)] transition active:scale-[0.99]"
      >
        Start Session
      </button>
    </motion.article>
  );
}

function CalendarIcon() {
  return <span className="text-[17px] leading-none">🗓️</span>;
}

function ShareIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 16V4" strokeLinecap="round" />
      <path d="m7 9 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14v3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return <span className="mt-1 text-[29px] leading-none">⭐</span>;
}

