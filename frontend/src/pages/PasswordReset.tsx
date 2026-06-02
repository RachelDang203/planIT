import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-[#8F98A6]"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.75 6.75h14.5A1.75 1.75 0 0 1 21 8.5v7a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 15.5v-7a1.75 1.75 0 0 1 1.75-1.75Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="m4 8 7.12 5.1a1.5 1.5 0 0 0 1.76 0L20 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-12 w-12 text-primary"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.25 10h-.65V7.8a4.6 4.6 0 0 0-9.2 0V10h-.65A1.75 1.75 0 0 0 5 11.75v6A1.75 1.75 0 0 0 6.75 19.5h10.5A1.75 1.75 0 0 0 19 17.75v-6A1.75 1.75 0 0 0 17.25 10ZM9.65 7.8a2.35 2.35 0 0 1 4.7 0V10h-4.7V7.8Z" />
      <path d="M12 14.1a1.15 1.15 0 0 0-.45 2.21v1.04a.45.45 0 0 0 .9 0v-1.04A1.15 1.15 0 0 0 12 14.1Z" fill="white" />
    </svg>
  );
}

export default function PasswordReset() {
  return (
    <motion.div
      className="relative min-h-screen bg-white px-5 pb-5 pt-3 font-sans text-[#202033]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
    >
      <Link
        to="/login"
        aria-label="Back to login"
        className="mb-12 flex h-10 w-10 items-center justify-center text-[#202033]"
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
            strokeWidth="2.5"
          />
        </svg>
      </Link>

      <section className="text-center">
        <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF4FF]">
          <LockIcon />
        </div>

        <h1 className="text-[29px] font-extrabold leading-tight tracking-[-0.05em] text-[#202033]">
          Reset Password
        </h1>
        <p className="mx-auto mt-4 max-w-[300px] text-[16px] font-medium leading-6 tracking-[-0.02em] text-[#8B92A0]">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </section>

      <form className="mt-12 space-y-5">
        <label className="relative block">
          <span className="absolute left-5 top-1/2 -translate-y-1/2">
            <MailIcon />
          </span>
          <Input
            type="email"
            placeholder="Email address"
            className="h-[52px] w-full rounded-xl border-0 bg-[#F4F6FA] py-0 pl-12 pr-5 text-[16px] font-semibold tracking-[-0.02em] text-[#202033] outline-none placeholder:text-[#AAB2C0] focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <Button
          type="submit"
          className="h-[58px] w-full rounded-xl bg-primary text-[17px] font-extrabold tracking-[-0.025em] text-white shadow-[0_12px_24px_rgba(74,144,226,0.28)] transition active:scale-[0.99]"
        >
          Send Reset Link
        </Button>
      </form>

      <p className="mt-5 text-center text-[13px] font-medium tracking-[-0.01em] text-[#747B88]">
        Check your spam folder if you don&apos;t see the email
      </p>

      <div className="my-24 flex items-center gap-4 text-center text-[14px] font-extrabold tracking-[-0.01em] text-[#B0B7C3]">
        <div className="h-px flex-1 bg-[#EEF0F5]" />
        <span>OR</span>
        <div className="h-px flex-1 bg-[#EEF0F5]" />
      </div>

      <section className="text-center">
        <h2 className="text-[16px] font-extrabold tracking-[-0.02em] text-[#8B92A0]">
          Or enter reset code
        </h2>

        <div className="mx-auto mt-7 grid max-w-[280px] grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((index) => (
            <Card key={index} className="h-[60px] rounded-xl bg-[#F4F6FA]">
              <Input
                aria-label={`Reset code digit ${index + 1}`}
                inputMode="numeric"
                maxLength={1}
                className="h-full w-full rounded-xl bg-transparent text-center text-xl font-extrabold text-[#202033] outline-none focus:ring-2 focus:ring-primary/20"
              />
            </Card>
          ))}
        </div>

        <Link
          to="/reset"
          className="mt-11 inline-flex text-[17px] font-extrabold tracking-[-0.02em] text-primary"
        >
          Verify Code
        </Link>
      </section>

      <div className="absolute bottom-3 left-1/2 h-1 w-[132px] -translate-x-1/2 rounded-full bg-[#202033]/35" aria-hidden="true" />
    </motion.div>
  );
}