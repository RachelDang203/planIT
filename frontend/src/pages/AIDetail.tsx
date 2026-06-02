import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

type Session = {
  title: string;
  dateTime: string;
  description: string;
  tags: string[];
};

const sessions: Session[] = [
  {
    title: 'Limits & Derivatives Intro',
    dateTime: 'Monday, Nov 25 · 2:00 PM - 4:00 PM',
    description:
      'Focus on understanding limit notation and basic derivative rules. Complete 15 practice problems.',
    tags: ['Practice Problems', 'Beginner'],
  },
  {
    title: 'Derivative Rules',
    dateTime: 'Tuesday, Nov 26 · 2:00 PM - 4:00 PM',
    description:
      'Review core derivative rules and apply them to polynomial, exponential, and trigonometric examples.',
    tags: ['Core Concepts', 'Intermediate'],
  },
  {
    title: 'Chain Rule & Applications',
    dateTime: 'Wednesday, Nov 25 · 2:00 PM - 4:00 PM',
    description:
      'Practice identifying composite functions and solving application questions using the chain rule.',
    tags: ['Advanced'],
  },
  {
    title: 'Implicit Differentiation',
    dateTime: 'Thursday, Nov 26 · 2:00 PM - 4:00 PM',
    description:
      'Work through implicit equations step by step and check each derivative for algebra accuracy.',
    tags: ['Practice'],
  },
  {
    title: 'Related Rates Problems',
    dateTime: 'Friday, Nov 27 · 2:00 PM - 4:00 PM',
    description:
      'Translate word problems into diagrams and equations before differentiating with respect to time.',
    tags: ['Application'],
  },
  {
    title: 'Review & Practice Test',
    dateTime: 'Saturday, Nov 28 · 2:00 PM - 4:00 PM',
    description:
      'Complete a timed review set and revisit any topics that still feel unclear before the deadline.',
    tags: ['Review'],
  },
];

const materials = [
  { title: 'Calculus Textbook Ch. 2', subtitle: 'Read pages 45-67', icon: BookIcon },
  { title: 'Khan Academy Video', subtitle: 'Intro to limits · 12 min', icon: VideoIcon },
  { title: 'Practice Quiz', subtitle: '15 problems · 30 min', icon: QuizIcon },
];

export default function AIDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parsedIndex = Number(searchParams.get('index') ?? 0);
  const sessionIndex =
    Number.isInteger(parsedIndex) && parsedIndex >= 0 && parsedIndex < sessions.length
      ? parsedIndex
      : 0;
  const session = sessions[sessionIndex];

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="flex min-h-screen flex-col bg-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <header className="flex h-[63px] items-center justify-between px-5">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-start text-[34px] font-light leading-none text-primary"
          >
            ‹
          </button>
          <h1 className="text-center text-[18px] font-extrabold tracking-[-0.03em] text-[#1F1D2B]">
            Session {sessionIndex + 1} of 6
          </h1>
          <button
            type="button"
            aria-label="Edit session"
            className="flex h-10 w-10 items-center justify-end text-primary"
          >
            <EditIcon />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-5">
          <section className="flex h-[52px] items-center gap-3 bg-primary px-5 text-white">
            <ClockIcon />
            <span className="text-[16px] font-extrabold tracking-[-0.025em]">{session.dateTime}</span>
          </section>

          <section className="px-5 pb-7 pt-6">
            <h2 className="text-[22px] font-extrabold tracking-[-0.045em] text-[#1F1D2B]">
              {session.title}
            </h2>
            <p className="mt-5 text-[15px] font-medium leading-6 tracking-[-0.02em] text-[#667085]">
              {session.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {session.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-2 text-[14px] font-semibold tracking-[-0.02em] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="h-px bg-[#EEF0F4]" />

          <section className="px-5 pt-7">
            <h2 className="text-[19px] font-extrabold tracking-[-0.035em] text-[#1F1D2B]">
              Study Materials
            </h2>

            <div className="mt-4 space-y-3">
              {materials.map((material) => {
                const Icon = material.icon;

                return (
                  <button
                    key={material.title}
                    type="button"
                    className="flex h-[80px] w-full items-center gap-4 rounded-xl border border-[#E8EBF1] bg-white px-4 text-left shadow-[0_8px_18px_rgba(32,32,51,0.04)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3F6FA] text-primary">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-extrabold tracking-[-0.025em] text-[#1F1D2B]">
                        {material.title}
                      </span>
                      <span className="mt-1 block text-[13px] font-medium tracking-[-0.015em] text-[#667085]">
                        {material.subtitle}
                      </span>
                    </span>
                    <span className="text-[30px] font-light leading-none text-[#667085]">›</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mx-5 mt-7 rounded-xl border border-[#CFE5FF] bg-[#EEF8FF] px-5 pb-7 pt-5">
            <div className="flex items-center gap-3 text-primary">
              <StackIcon />
              <h2 className="text-[17px] font-extrabold tracking-[-0.025em]">
                AI Tips for this session
              </h2>
            </div>
            <ul className="mt-6 space-y-4 text-[14px] font-medium leading-5 tracking-[-0.015em] text-[#1F2937]">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Take notes while watching the Khan Academy video and pause to work through examples on
                  your own
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Use the practice quiz to check your understanding before moving on</span>
              </li>
            </ul>
          </section>
        </main>

        <footer className="sticky bottom-0 z-20 border-t border-[#EEF0F4] bg-white px-5 pb-8 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="h-[54px] rounded-xl border border-[#E5E7EB] bg-white text-[16px] font-extrabold tracking-[-0.025em] text-[#667085]"
            >
              Reschedule
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="h-[54px] rounded-xl bg-primary text-[16px] font-extrabold tracking-[-0.025em] text-white shadow-[0_12px_24px_rgba(74,144,226,0.28)]"
            >
              Start Session
            </button>
          </div>
          <div className="mx-auto mt-9 h-1 w-[134px] rounded-full bg-[#202033]/35" />
        </footer>
      </motion.div>
    </MobileContainer>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" strokeLinecap="round" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4Z" />
      <path d="M8 18h10" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h11v10H4z" />
      <path d="m15 10 5-3v10l-5-3" strokeLinejoin="round" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M15 3v5h4M10 12h5M10 16h5" />
    </svg>
  );
}

function StackIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 8 4-8 4-8-4 8-4Z" strokeLinejoin="round" />
      <path d="m4 12 8 4 8-4M4 17l8 4 8-4" strokeLinejoin="round" />
    </svg>
  );
}

