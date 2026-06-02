import { useLocation, useNavigate } from 'react-router-dom';
import type { SVGProps } from 'react';

type NavItem = {
  label: string;
  path: string;
  icon: (props: SVGProps<SVGSVGElement> & { active: boolean }) => JSX.Element;
};

const navItems: NavItem[] = [
  {
    label: 'Home',
    path: '/dashboard',
    icon: HomeIcon,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: TasksIcon,
  },
  {
    label: 'Calendar',
    path: '/calendar',
    icon: CalendarIcon,
  },
  {
    label: 'Progress',
    path: '/progress',
    icon: ProgressIcon,
  },
  {
    label: 'Profile',
    path: '/settings',
    icon: ProfileIcon,
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 h-[82px] w-full max-w-mobile -translate-x-1/2 border-t border-[#EEF0F4] bg-white px-5 pt-3 shadow-[0_-8px_20px_rgba(32,32,51,0.04)]">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
                isActive ? 'text-[#4A90E2]' : 'text-[#9CA3AF]'
              }`}
            >
              <Icon active={isActive} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-4 h-1 w-[134px] rounded-full bg-[#202033]/35" />
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5V21H5V10.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function TasksIcon({ active: _active }: { active: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 4h10v3H7zM6 8h12v12H6z" />
      <path d="M9 12h6M9 16h6" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v15H4z" />
      <path d="M4 10h16M8 3v5M16 3v5" />
    </svg>
  );
}

function ProgressIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0H4Z" />
    </svg>
  );
}