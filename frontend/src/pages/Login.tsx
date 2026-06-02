import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import { useUserStore } from '../store/user';
import * as api from '../lib/api';

const inputClassName =
  'h-[52px] w-full rounded-2xl border border-[#E8EBF1] bg-white py-0 pl-12 pr-5 text-[16px] font-semibold tracking-[-0.02em] text-[#202033] outline-none placeholder:text-[#202033] focus:border-primary/40 focus:ring-2 focus:ring-primary/15';

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#747B88]"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.5 5.75h15A1.5 1.5 0 0 1 21 7.25v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 16.75v-9.5a1.5 1.5 0 0 1 1.5-1.5Zm.38 2.1 6.46 4.84a1.1 1.1 0 0 0 1.32 0l6.46-4.84a.5.5 0 0 0-.3-.9H5.18a.5.5 0 0 0-.3.9Z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#747B88]"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.5 10h-.75V7.75a4.75 4.75 0 0 0-9.5 0V10H6.5A1.5 1.5 0 0 0 5 11.5v6A1.5 1.5 0 0 0 6.5 19h11a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5Zm-8-2.25a2.5 2.5 0 0 1 5 0V10h-5V7.75Z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-[#747B88]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 12s3.25-5.25 9.25-5.25S21.25 12 21.25 12 18 17.25 12 17.25 2.75 12 2.75 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function DecorativeDots() {
  const dots = [
    'left-[28px] top-[8px] h-2 w-2 opacity-60',
    'left-[58px] top-0 h-3 w-3 opacity-60',
    'left-[92px] top-[14px] h-2.5 w-2.5 opacity-50',
    'left-[126px] top-[6px] h-2 w-2 opacity-55',
    'left-[166px] top-[18px] h-3 w-3 opacity-50',
    'left-[206px] top-[12px] h-2.5 w-2.5 opacity-55',
    'left-[48px] top-[44px] h-3 w-3 opacity-55',
    'left-[88px] top-[56px] h-2 w-2 opacity-55',
    'left-[116px] top-[80px] h-3.5 w-3.5 opacity-60',
    'left-[188px] top-[54px] h-2 w-2 opacity-50',
  ];

  return (
    <div className="pointer-events-none absolute right-0 top-0 h-28 w-56" aria-hidden="true">
      {dots.map((dot) => (
        <span key={dot} className={`absolute rounded-full bg-[#E8F1FC] ${dot}`} />
      ))}
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const login = useUserStore((s) => s.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.login(email, password);
      setUser(data.user_id, data.name, data.email);
      login();
      navigate('/dashboard');
    } catch {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-white px-5 pb-4 pt-3 font-sans text-[#202033]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
    >
      <header className="relative mb-12">
        <DecorativeDots />

        <div className="relative z-10 mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-[0_7px_16px_rgba(74,144,226,0.35)]">
            <span className="rounded-sm bg-white px-1 text-[22px] font-extrabold leading-none tracking-[-0.12em] text-primary">
              P
            </span>
          </div>
          <Logo className="text-[20px] font-extrabold tracking-[-0.035em] text-[#202033]" />
        </div>

        <div className="relative z-10">
          <h1 className="text-[31px] font-extrabold leading-tight tracking-[-0.055em] text-[#202033]">
            Welcome back! 👋
          </h1>
          <p className="mt-3 text-[17px] font-medium leading-6 tracking-[-0.025em] text-[#8B92A0]">
            Sign in to continue your study streak
          </p>
        </div>
      </header>

      <form className="space-y-6" onSubmit={handleLogin}>
        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Email Address
          </span>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2">
              <MailIcon />
            </span>
            <Input
              className={inputClassName}
              placeholder="alex@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Password
          </span>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2">
              <LockIcon />
            </span>
            <Input
              className={`${inputClassName} pr-14`}
              placeholder="••••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              aria-label="Show password"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <EyeIcon />
            </button>
          </div>
        </label>

        <div className="-mt-3 text-right">
          <Link to="/reset" className="text-[15px] font-bold tracking-[-0.015em] text-primary">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-10 h-[58px] w-full rounded-xl bg-primary text-[17px] font-extrabold tracking-[-0.025em] text-white shadow-[0_12px_24px_rgba(74,144,226,0.28)] transition active:scale-[0.99]"
        >
          Sign In
        </Button>
      </form>

      <div className="my-9 flex items-center gap-4 text-center text-[15px] font-semibold tracking-[-0.01em] text-[#B0B7C3]">
        <div className="h-px flex-1 bg-[#EEF0F5]" />
        <span>or</span>
        <div className="h-px flex-1 bg-[#EEF0F5]" />
      </div>

      <div className="flex justify-center">
        <Card className="flex h-[56px] w-[56px] items-center justify-center rounded-xl border border-[#E8EBF1] bg-white shadow-[0_1px_6px_rgba(32,32,51,0.04)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </Card>
      </div>

      <p className="mt-8 text-center text-[15px] font-semibold tracking-[-0.015em] text-[#8B92A0]">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="font-extrabold text-primary">
          Sign Up
        </Link>
      </p>

      <div className="absolute bottom-3 left-1/2 h-1 w-[132px] -translate-x-1/2 rounded-full bg-[#202033]/35" aria-hidden="true" />
    </motion.div>
  );
}