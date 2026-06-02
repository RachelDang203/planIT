import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';
import { useTaskStore } from '../store/tasks';

type Filter = 'All' | 'Today' | 'This Week' | 'Completed';

type LocalTask = {
  id: string;
  title: string;
  date: string;
  time?: string;
  completed: boolean;
  highlighted?: boolean;
};

const filters: Filter[] = ['All', 'Today', 'This Week', 'Completed'];

export default function TaskList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const storeTasks = useTaskStore((s) => s.tasks);
  const toggleDone = useTaskStore((s) => s.toggleDone);
  const deleteStoreTask = useTaskStore((s) => s.deleteTask);

  const tasks: LocalTask[] = storeTasks.map((t, i) => ({
    id: t.id,
    title: t.subject,
    date: t.deadline,
    completed: t.done,
    highlighted: i === 2,
  }));

  const toggleTask = (taskId: string) => {
    toggleDone(taskId);
  };

  const deleteTask = (taskId: string) => {
    deleteStoreTask(taskId);
    setActiveMenuId(null);
  };

  const markComplete = (taskId: string) => {
    toggleDone(taskId);
    setActiveMenuId(null);
  };

  const editTask = () => {
    setActiveMenuId(null);
    navigate('/task/new');
  };

  const rescheduleTask = () => {
    setActiveMenuId(null);
    window.alert('Reschedule coming soon');
  };

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="relative flex min-h-screen flex-col bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {activeMenuId !== null && (
          <div
            className="fixed inset-0 z-20 bg-transparent"
            onClick={() => setActiveMenuId(null)}
            aria-hidden="true"
          />
        )}

        <main className="flex-1 overflow-y-auto pb-28">
          <header className="flex items-center justify-between px-5 pb-6 pt-5">
            <h1 className="text-[25px] font-extrabold tracking-[-0.045em] text-[#171725]">Tasks</h1>
            <button
              type="button"
              aria-label="Filter tasks"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8FAFC] text-primary shadow-[0_8px_18px_rgba(32,32,51,0.04)]"
            >
              <SlidersIcon />
            </button>
          </header>

          <div className="h-px bg-[#EEF0F4]" />

          <section className="flex gap-3 overflow-x-auto px-5 py-4">
            {filters.map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveFilter(filter);
                  }}
                  className={`h-[36px] shrink-0 rounded-full px-5 text-[14px] font-semibold tracking-[-0.02em] transition ${
                    active
                      ? 'bg-primary text-white shadow-[0_8px_16px_rgba(74,144,226,0.28)]'
                      : 'border border-[#E5E7EB] bg-white text-[#6B7280]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </section>

          <section className="relative space-y-3 px-5">
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  menuOpen={activeMenuId === task.id}
                  onToggle={() => toggleTask(task.id)}
                  onOpenMenu={() => setActiveMenuId(task.id)}
                  onEdit={editTask}
                  onReschedule={rescheduleTask}
                  onMarkComplete={() => markComplete(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </AnimatePresence>
          </section>

          <p className="mt-8 text-center text-[13px] font-medium tracking-[-0.02em] text-[#A3A8B2]">
            ← Swipe left to delete
          </p>
        </main>

      </motion.div>
    </MobileContainer>
  );
}

function TaskCard({
  task,
  menuOpen,
  onToggle,
  onOpenMenu,
  onEdit,
  onReschedule,
  onMarkComplete,
  onDelete,
}: {
  task: LocalTask;
  menuOpen: boolean;
  onToggle: () => void;
  onOpenMenu: () => void;
  onEdit: () => void;
  onReschedule: () => void;
  onMarkComplete: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.article
      className="relative"
      layout
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={onOpenMenu}
        onContextMenu={(event) => {
          event.preventDefault();
          onOpenMenu();
        }}
        className={`flex min-h-[78px] w-full items-center gap-3 rounded-xl border bg-white px-4 py-4 text-left shadow-[0_10px_22px_rgba(32,32,51,0.06)] ${
          task.highlighted ? 'border-primary' : 'border-[#EEF0F4]'
        } ${task.completed ? 'bg-[#F8FBFF]' : ''}`}
      >
        <span
          role="checkbox"
          aria-checked={task.completed}
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-[14px] font-extrabold ${
            task.completed ? 'border-primary bg-primary text-white' : 'border-[#D1D5DB] bg-white text-transparent'
          }`}
        >
          ✓
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-[16px] font-extrabold tracking-[-0.025em] ${
              task.completed ? 'text-[#9CA3AF] line-through' : 'text-[#171725]'
            }`}
          >
            {task.title}
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-medium tracking-[-0.015em] text-[#6B7280]">
            {task.date && (
              <span className="flex items-center gap-1">
                <CalendarMiniIcon />
                {task.date}
              </span>
            )}
            {task.time && (
              <span className="flex items-center gap-1">
                <ClockMiniIcon />
                {task.time}
              </span>
            )}
          </span>
        </span>
      </button>

      {menuOpen && (
        <ContextMenu
          onEdit={onEdit}
          onReschedule={onReschedule}
          onMarkComplete={onMarkComplete}
          onDelete={onDelete}
        />
      )}
    </motion.article>
  );
}

function ContextMenu({
  onEdit,
  onReschedule,
  onMarkComplete,
  onDelete,
}: {
  onEdit: () => void;
  onReschedule: () => void;
  onMarkComplete: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute left-[120px] top-10 z-30 w-[190px] rounded-xl bg-white py-3 shadow-[0_18px_40px_rgba(32,32,51,0.18)]">
      <MenuButton icon="✎" label="Edit" onClick={onEdit} />
      <MenuButton icon="▣" label="Reschedule" onClick={onReschedule} />
      <MenuButton icon="●" label="Mark Complete" onClick={onMarkComplete} />
      <MenuButton icon="♲" label="Delete" danger onClick={onDelete} />
    </div>
  );
}

function MenuButton({ icon, label, danger, onClick }: { icon: string; label: string; danger?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 w-full items-center gap-4 px-5 text-left text-[16px] font-semibold tracking-[-0.02em] ${
        danger ? 'text-[#EF4444]' : 'text-[#1F1D2B]'
      }`}
    >
      <span className="w-4 text-center text-[15px]">{icon}</span>
      {label}
    </button>
  );
}

function SlidersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      <circle cx="9" cy="7" r="2" fill="white" />
      <circle cx="15" cy="12" r="2" fill="white" />
      <circle cx="11" cy="17" r="2" fill="white" />
    </svg>
  );
}

function CalendarMiniIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 5h14v15H5zM5 9h14M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockMiniIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}


