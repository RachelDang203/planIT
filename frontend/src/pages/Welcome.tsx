import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';

export default function Welcome() {
  return (
    <motion.section
      className="flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-[#4A90E2] to-[#2F73C4] font-sans text-white"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-10 pt-20 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-[0_18px_45px_rgba(24,79,142,0.24)]">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4A90E2] text-white shadow-inner">
            <Logo className="text-[0px]" />
            <span className="text-4xl font-extrabold leading-none tracking-[-0.08em]" aria-hidden="true">
              P
            </span>
            <span
              className="absolute right-3 top-3 text-xl font-black leading-none text-white"
              aria-hidden="true"
            >
              ⚡
            </span>
          </div>
        </div>

        <Logo className="mb-3 text-4xl font-bold tracking-[-0.04em] text-white" />
        <p className="text-base font-medium tracking-[-0.01em] text-white/85">
          Your AI study companion
        </p>
      </div>

      <div className="rounded-t-[36px] bg-white px-7 pb-10 pt-11 text-center text-slate-950 shadow-[0_-18px_50px_rgba(27,72,125,0.18)]">
        <h1 className="mx-auto max-w-[320px] text-[34px] font-bold leading-[1.08] tracking-[-0.045em]">
          Study smarter, not harder
        </h1>

        <p className="mx-auto mt-4 max-w-[300px] text-[16px] font-normal leading-6 tracking-[-0.01em] text-slate-500">
          Let AI build your perfect study plan in seconds.
        </p>

        <Link
          to="/signup"
          className="mt-9 flex h-14 w-full items-center justify-center rounded-2xl bg-[#4A90E2] text-base font-semibold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(74,144,226,0.3)] transition active:scale-[0.99]"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="mt-6 inline-flex text-[15px] font-medium tracking-[-0.01em] text-slate-500"
        >
          I already have an account
        </Link>
      </div>
    </motion.section>
  );
}