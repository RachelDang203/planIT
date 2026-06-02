import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';

function getTodayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

type Priority = 'low' | 'medium' | 'high';

const priorities: { label: string; value: Priority }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export default function AddTaskBasic() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const todayISO = getTodayISO();
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [priority, setPriority] = useState<Priority>('medium');
  const [duration, setDuration] = useState(2);
  const [notes, setNotes] = useState('');
  const [aiPlanning, setAiPlanning] = useState(true);

  const setDraft = useTaskStore((s) => s.setDraft);

  const handleContinue = () => {
    setDraft({ subject, deadline: formatDisplayDate(selectedDate), priority, duration, notes, aiEnabled: aiPlanning });
    navigate('/task/new/more');
  };

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#202033]">
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
            className="flex h-10 w-10 items-center justify-start text-[36px] font-light leading-none text-[#1F1D2B]"
          >
            ‹
          </button>
          <h1 className="text-center text-[20px] font-extrabold tracking-[-0.03em] text-[#1F1D2B]">
            New Study Task
          </h1>
          <button
            type="button"
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-end text-[32px] font-light leading-none text-[#1F1D2B]"
          >
            ×
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-6 pt-6">
          <div className="space-y-[22px]">
            <Field label="Subject / Topic">
              <div className="flex h-[54px] items-center gap-4 rounded-2xl border border-[#E7EAF0] bg-white px-4 shadow-[0_8px_20px_rgba(32,32,51,0.04)]">
                <BookIcon />
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="e.g. Calculus Chapter 3"
                  className="h-full flex-1 bg-transparent text-[16px] font-medium tracking-[-0.02em] text-[#202033] outline-none placeholder:text-[#A8ADB7]"
                />
              </div>
            </Field>

            <Field label="Deadline">
              <div className="flex h-[54px] items-center gap-4 rounded-2xl border border-[#E7EAF0] bg-white px-4 shadow-[0_8px_20px_rgba(32,32,51,0.04)]">
                <CalendarIcon />
                <span className="text-[16px] font-medium tracking-[-0.02em] text-[#777D87]">
                  Due Date
                </span>
                <input
                  type="date"
                  value={selectedDate}
                  min={todayISO}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="ml-auto h-full bg-transparent text-right text-[16px] font-extrabold tracking-[-0.02em] text-primary outline-none"
                />
              </div>
            </Field>

            <Field label="Priority">
              <div className="grid grid-cols-3 gap-3">
                {priorities.map((item) => {
                  const isActive = priority === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setPriority(item.value)}
                      className={`h-[46px] rounded-2xl text-[15px] font-extrabold tracking-[-0.02em] shadow-[0_8px_18px_rgba(32,32,51,0.04)] transition active:scale-[0.98] ${
                        isActive && item.value === 'low'
                          ? 'bg-[#111111] text-white'
                          : isActive && item.value === 'medium'
                            ? 'bg-[#F97316] text-white'
                            : isActive && item.value === 'high'
                              ? 'bg-[#EF4444] text-white'
                              : 'bg-[#F3F4F6] text-[#9CA3AF]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Study Duration">
              <div className="flex h-[76px] items-center justify-between rounded-2xl border border-[#E7EAF0] bg-white px-5 shadow-[0_8px_20px_rgba(32,32,51,0.04)]">
                <button
                  type="button"
                  aria-label="Decrease duration"
                  onClick={() => setDuration((current) => Math.max(1, current - 1))}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#F4F7FB] text-[22px] font-extrabold text-primary"
                >
                  −
                </button>
                <span className="text-[18px] font-extrabold tracking-[-0.03em] text-[#171725]">
                  {duration} {duration === 1 ? 'hour' : 'hours'}
                </span>
                <button
                  type="button"
                  aria-label="Increase duration"
                  onClick={() => setDuration((current) => current + 1)}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#F4F7FB] text-[22px] font-extrabold text-primary"
                >
                  +
                </button>
              </div>
            </Field>

            <Field label="Notes">
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Additional notes..."
                className="h-[120px] w-full resize-none rounded-2xl border border-[#E9ECF2] bg-[#F3F6FA] px-4 py-4 text-[16px] font-medium tracking-[-0.02em] text-[#202033] outline-none placeholder:text-[#A8ADB7]"
              />
            </Field>

            <div className="flex h-[62px] items-center justify-between rounded-2xl border border-[#E7EAF0] bg-white px-4 shadow-[0_8px_20px_rgba(32,32,51,0.04)]">
              <span className="text-[16px] font-extrabold tracking-[-0.025em] text-[#202033]">
                Enable AI Planning ✨
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={aiPlanning}
                onClick={() => setAiPlanning((current) => !current)}
                className={`flex h-[31px] w-[52px] items-center rounded-full p-[2px] transition ${
                  aiPlanning ? 'justify-end bg-primary' : 'justify-start bg-[#D8DCE4]'
                }`}
              >
                <span className="h-[27px] w-[27px] rounded-full bg-white shadow-[0_2px_5px_rgba(32,32,51,0.25)]" />
              </button>
            </div>
          </div>
        </main>

        <footer className="bg-white px-5 pb-11 pt-1">
          <button
            type="button"
            onClick={handleContinue}
            className="h-[56px] w-full rounded-xl bg-primary text-[16px] font-extrabold tracking-[-0.025em] text-white shadow-[0_14px_26px_rgba(74,144,226,0.32)] transition active:scale-[0.99]"
          >
            Continue
          </button>
          <div className="mx-auto mt-9 h-1 w-[134px] rounded-full bg-[#202033]/35" />
        </footer>
      </motion.div>
    </MobileContainer>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
        {label}
      </span>
      {children}
    </label>
  );
}

function BookIcon() {
  return (
    <svg className="h-5 w-5 text-[#737A84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4Z" />
      <path d="M8 18h10" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-5 w-5 text-[#737A84]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5h14v15H5z" />
      <path d="M5 9h14M8 3v4M16 3v4" />
    </svg>
  );
}

