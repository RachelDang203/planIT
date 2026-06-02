import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';
import { useUserStore } from '../store/user';
import * as api from '../lib/api';

type TaskStatus = 'done' | 'progress' | 'deadline' | 'none';

type Task = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  status: TaskStatus;
  statusText?: string;
  muted?: boolean;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const userId = useUserStore((s) => s.userId);
  const storeTasks = useTaskStore((s) => s.tasks);
  const setTasks = useTaskStore((s) => s.setTasks);
  const toggleDone = useTaskStore((s) => s.toggleDone);

  useEffect(() => {
    if (!userId) return;
    api.getTasks(userId).then((data) => {
      const mapped = data.tasks.map((t: Record<string, unknown>) => ({
        id: t.id as string,
        subject: t.subject as string,
        deadline: (t.deadline as string) || '',
        priority: ((t.priority as string) || 'medium') as 'low' | 'medium' | 'high',
        duration: (t.duration as number) || 1,
        notes: (t.notes as string) || '',
        aiEnabled: (t.ai_enabled as boolean) ?? true,
        done: (t.done as boolean) || false,
        createdAt: (t.created_at as string) || new Date().toISOString(),
      }));
      setTasks(mapped);
    }).catch(() => {
      // fall back to local state if API unavailable
    });
  }, [userId, setTasks]);

  const todayTasks: Task[] = storeTasks.map((t) => ({
    id: t.id,
    title: t.subject,
    duration: `${t.duration}h`,
    completed: t.done,
    status: (t.done ? 'done' : 'none') as TaskStatus,
    statusText: t.done ? 'Done' : undefined,
  }));

  const completedCount = todayTasks.filter((task) => task.completed).length;
  const totalCount = todayTasks.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="relative flex min-h-screen flex-col bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <main className="flex-1 overflow-y-auto px-5 pb-28 pt-5">
          <header>
            <h1 className="text-[25px] font-extrabold tracking-[-0.045em] text-[#171725]">Today</h1>
          </header>

          <section className="mt-5 flex h-24 items-center justify-between rounded-xl bg-primary px-5 text-white shadow-[0_14px_26px_rgba(74,144,226,0.28)]">
            <div>
              <p className="text-[17px] font-extrabold tracking-[-0.025em]">{totalCount} tasks today</p>
              <p className="mt-1 text-[16px] font-semibold tracking-[-0.025em] text-white/90">
                {completedCount} completed
              </p>
            </div>
            <ProgressRing percentage={percentage} />
          </section>

          <SectionTitle className="mt-6">Due Today</SectionTitle>
          <div className="mt-3 space-y-3">
            {todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={() => toggleDone(task.id)} />
            ))}
          </div>

        </main>

        <button
          type="button"
          aria-label="Add task"
          onClick={() => navigate('/task/new')}
          className="fixed bottom-[104px] right-[calc(50%-195px)] z-30 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-primary text-[32px] font-light leading-none text-white shadow-[0_12px_24px_rgba(74,144,226,0.34)] max-[430px]:right-5"
        >
          +
        </button>
      </motion.div>
    </MobileContainer>
  );
}

function TaskCard({ task, onToggle }: { task: Task; onToggle: () => void }) {
  return (
    <article className="flex min-h-[78px] items-center gap-3 rounded-xl border border-[#EEF0F4] bg-white px-4 py-4 shadow-[0_10px_22px_rgba(32,32,51,0.06)]">
      <button
        type="button"
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        onClick={onToggle}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-[14px] font-extrabold ${
          task.completed ? 'border-primary bg-primary text-white' : 'border-[#D1D5DB] bg-white text-transparent'
        }`}
      >
        ✓
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-[15px] font-extrabold tracking-[-0.025em] ${
            task.completed ? 'text-[#9CA3AF] line-through' : task.muted ? 'text-[#A3A8B2]' : 'text-[#171725]'
          }`}
        >
          {task.title}
        </h3>
        <div className="mt-2 flex items-center gap-2 text-[13px] font-medium tracking-[-0.015em] text-[#6B7280]">
          <span>{task.duration}</span>
          <StatusBadge task={task} />
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ task }: { task: Task }) {
  if (task.status === 'done') {
    return <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-[12px] font-bold text-[#22C55E]">Done</span>;
  }

  if (task.status === 'progress') {
    return <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-[12px] font-bold text-[#D97706]">In Progress</span>;
  }

  if (task.status === 'deadline') {
    return (
      <span className="flex items-center gap-1 text-[12px] font-bold text-[#EF4444]">
        <ClockIcon />
        {task.statusText}
      </span>
    );
  }

  return null;
}

function SectionTitle({ children, className = '' }: { children: string; className?: string }) {
  return <h2 className={`text-[18px] font-extrabold tracking-[-0.035em] text-[#171725] ${className}`.trim()}>{children}</h2>;
}

function ProgressRing({ percentage }: { percentage: number }) {
  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  return (
    <div className="relative h-[58px] w-[58px]">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r={radius} stroke="rgba(255,255,255,0.28)" strokeWidth="5" fill="none" />
        <circle cx="30" cy="30" r={radius} stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[14px] font-extrabold text-white">{percentage}%</span>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

