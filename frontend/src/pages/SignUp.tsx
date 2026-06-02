import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useUserStore } from '../store/user';
import * as api from '../lib/api';

const inputClassName =
  'h-[52px] w-full rounded-xl border-0 bg-[#F4F6FA] px-5 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#AAB2C0] focus:ring-2 focus:ring-primary/25';

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-[#AAB2C0]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 12s3.25-5.25 9.25-5.25S21.25 12 21.25 12 18 17.25 12 17.25 2.75 12 2.75 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-8 text-[#9EA7B3]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 7.25 10 5.5h4l1.25 1.75H18A2.25 2.25 0 0 1 20.25 9.5v7A2.25 2.25 0 0 1 18 18.75H6a2.25 2.25 0 0 1-2.25-2.25v-7A2.25 2.25 0 0 1 6 7.25h2.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path
        d="M12 15.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore((s) => s.setUser);
  const login = useUserStore((s) => s.login);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.signup(name, email, password);
      setUser(data.user_id, data.name, data.email);
      login();
      navigate('/dashboard');
    } catch {
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white px-5 pb-3 pt-3 font-sans text-[#202033]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
    >
      <header className="relative mb-8 text-center">
        <Link
          to="/"
          aria-label="Back to welcome"
          className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center text-[#202033]"
        >
          <svg
            aria-hidden="true"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19 8 12l7-7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
          </svg>
        </Link>

        <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.045em] text-[#202033]">
          Create Account
        </h1>
        <p className="mt-4 text-[17px] font-medium tracking-[-0.025em] text-[#8B92A0]">
          Start your learning journey
        </p>
      </header>

      <div className="mb-8 flex justify-center">
        <button
          type="button"
          aria-label="Add profile photo"
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-[#E8EBF1] bg-[#F5F7FB] shadow-[inset_0_0_0_1px_rgba(32,32,51,0.02)]"
        >
          <CameraIcon />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSignUp}>
        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Full Name
          </span>
            <Input
              className={inputClassName}
              placeholder="Alex Johnson"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Email Address
          </span>
            <Input
              className={inputClassName}
              placeholder="alex@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </label>

        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Password
          </span>
          <div className="relative">
            <Input
              className={`${inputClassName} pr-14`}
              placeholder="Enter password"
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

        <label className="block">
          <span className="mb-2 block text-[15px] font-extrabold tracking-[-0.025em] text-[#202033]">
            Confirm Password
          </span>
          <div className="relative">
            <Input className={`${inputClassName} pr-14`} placeholder="Re-enter password" type="password" />
            <button
              type="button"
              aria-label="Show confirm password"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <EyeIcon />
            </button>
          </div>
        </label>

        <label className="flex items-center gap-3 pt-1 text-[14px] font-semibold tracking-[-0.015em] text-[#8B92A0]">
          <Input
            type="checkbox"
            className="h-5 w-5 shrink-0 appearance-none rounded-md border-2 border-primary bg-white checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
          />
          <span>
            I agree to{' '}
            <Link to="/settings" className="font-bold text-primary">
              Terms &amp; Privacy Policy
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          className="mt-5 h-[58px] w-full rounded-xl bg-primary text-[17px] font-extrabold tracking-[-0.025em] text-white shadow-[0_12px_24px_rgba(74,144,226,0.28)] transition active:scale-[0.99]"
        >
          Create Account
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4 text-center text-[14px] font-semibold tracking-[-0.01em] text-[#B0B7C3]">
        <div className="h-px flex-1 bg-[#EEF0F5]" />
        <span>or continue with</span>
        <div className="h-px flex-1 bg-[#EEF0F5]" />
      </div>

      <div className="flex justify-center">
        <Card className="flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#E8EBF1] bg-white shadow-[0_1px_6px_rgba(32,32,51,0.04)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </Card>
      </div>

      <p className="mt-7 text-center text-[15px] font-semibold tracking-[-0.015em] text-[#8B92A0]">
        Already have an account?{' '}
        <Link to="/login" className="font-extrabold text-primary">
          Sign In
        </Link>
      </p>

      <div className="mx-auto mt-3 h-1 w-[132px] rounded-full bg-[#202033]/35" aria-hidden="true" />
    </motion.div>
  );
}