import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';
import { useUserStore } from '../store/user';
import * as api from '../lib/api';

type KnowledgeLevel = 'beginner' | 'some' | 'intermediate' | 'advanced' | 'expert';
type Preference = 'flashcards' | 'practice' | 'reading';

const knowledgeOptions: { label: string; value: KnowledgeLevel; emoji: string }[] = [
  { label: 'Beginner', value: 'beginner', emoji: '😕' },
  { label: 'Some Knowledge', value: 'some', emoji: '🤔' },
  { label: 'Intermediate', value: 'intermediate', emoji: '😊' },
  { label: 'Advanced', value: 'advanced', emoji: '💪' },
  { label: 'Expert', value: 'expert', emoji: '🎯' },
];

const preferenceOptions: { label: string; value: Preference }[] = [
  { label: 'Flashcards', value: 'flashcards' },
  { label: 'Practice Problems', value: 'practice' },
  { label: 'Reading', value: 'reading' },
];

export default function AddTaskAdvanced() {
  const navigate = useNavigate();
  const userId = useUserStore((s) => s.userId);
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel>('some');
  const [preferences, setPreferences] = useState<Preference[]>(['practice', 'reading']);
  const [examImportance, setExamImportance] = useState(75);
  const [studyReminders, setStudyReminders] = useState(true);

  const draft = useTaskStore((s) => s.draft);
  const addTask = useTaskStore((s) => s.addTask);
  const clearDraft = useTaskStore((s) => s.clearDraft);

  const togglePreference = (preference: Preference) => {
    setPreferences((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference],
    );
  };

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="flex min-h-screen flex-col bg-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <header className="flex h-[76px] items-center justify-between border-b border-[#EEF0F4] px-5">
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-start text-[34px] font-light leading-none text-[#1F1D2B]"
          >
            ‹
          </button>
          <h1 className="text-center text-[18px] font-extrabold tracking-[-0.03em] text-[#1F1D2B]">
            Additional Details
          </h1>
          <span className="w-10 text-right text-[15px] font-semibold tracking-[-0.02em] text-[#6B7280]">
            2 of 2
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-6 pt-6">
          <section>
            <h2 className="text-[18px] font-extrabold tracking-[-0.035em] text-[#1F1D2B]">
              How well do you know this topic?
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {knowledgeOptions.map((option) => {
                const isActive = knowledgeLevel === option.value;
                const isExpert = option.value === 'expert';

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setKnowledgeLevel(option.value)}
                    className={`flex h-[100px] flex-col items-center justify-center rounded-xl border text-center shadow-[0_5px_14px_rgba(32,32,51,0.04)] transition active:scale-[0.99] ${
                      isExpert ? 'col-span-2' : ''
                    } ${isActive ? 'border-[#4A90E2] bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <span className="text-[32px] leading-none">{option.emoji}</span>
                    <span className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-[#1F1D2B]">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-[18px] font-extrabold tracking-[-0.035em] text-[#1F1D2B]">
              Study Preferences
            </h2>

            <div className="mt-4 flex gap-2">
              {preferenceOptions.map((option) => {
                const isActive = preferences.includes(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => togglePreference(option.value)}
                    className={`h-[42px] rounded-full px-5 text-[14px] font-bold tracking-[-0.02em] shadow-[0_4px_12px_rgba(32,32,51,0.04)] transition active:scale-[0.98] ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'border border-gray-200 bg-[#F3F4F6] text-[#6B7280]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-9">
            <h2 className="text-[16px] font-extrabold tracking-[-0.025em] text-[#1F1D2B]">
              Exam Importance
            </h2>
            <div className="mt-3 flex items-center justify-between text-[12px] font-semibold text-[#6B7280]">
              <span>Low</span>
              <span>High</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={examImportance}
              onChange={(event) => setExamImportance(Number(event.target.value))}
              className="mt-1 h-2 w-full cursor-pointer accent-primary"
            />
          </section>

          <section className="mt-6 flex items-center justify-between">
            <span className="text-[16px] font-extrabold tracking-[-0.025em] text-[#1F1D2B]">
              Study reminders
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={studyReminders}
              onClick={() => setStudyReminders((current) => !current)}
              className={`flex h-[31px] w-[52px] items-center rounded-full p-[2px] transition ${
                studyReminders ? 'justify-end bg-primary' : 'justify-start bg-[#D8DCE4]'
              }`}
            >
              <span className="h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_5px_rgba(32,32,51,0.25)]" />
            </button>
          </section>
        </main>

        <footer className="bg-white px-5 pb-11 pt-2">
          <button
            type="button"
            onClick={async () => {
              const task = {
                id: Date.now().toString(),
                ...draft,
                subject: draft.subject || 'Untitled',
                deadline: draft.deadline || '',
                priority: draft.priority || 'medium',
                duration: draft.duration || 1,
                notes: draft.notes || '',
                aiEnabled: draft.aiEnabled ?? true,
                done: false,
                createdAt: new Date().toISOString(),
              };

              addTask(task);
              clearDraft();

              if (userId) {
                try {
                  await api.createTask({
                    user_id: userId,
                    subject: task.subject,
                    deadline: task.deadline,
                    priority: task.priority,
                    duration: task.duration,
                    notes: task.notes,
                    ai_enabled: task.aiEnabled,
                    done: false,
                  });
                } catch {
                  // silently fail — task is already saved locally
                }
              }

              navigate('/ai/loading');
            }}
            className="h-[58px] w-full rounded-xl bg-primary text-[16px] font-extrabold tracking-[-0.025em] text-white shadow-[0_14px_26px_rgba(74,144,226,0.32)] transition active:scale-[0.99]"
          >
            Generate Study Plan ✨
          </button>
          <div className="mx-auto mt-9 h-1 w-[134px] rounded-full bg-[#202033]/35" />
        </footer>
      </motion.div>
    </MobileContainer>
  );
}

