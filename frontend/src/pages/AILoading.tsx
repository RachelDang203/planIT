import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/layout/MobileContainer';

const steps = [
  { label: 'Analyzing topic complexity', status: 'done' },
  { label: 'Estimating study sessions', status: 'done' },
  { label: 'Optimizing schedule...', status: 'loading' },
] as const;

export default function AILoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      navigate('/ai/result');
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <MobileContainer className="relative min-h-screen overflow-hidden bg-white font-sans text-[#1F1D2B]">
      <motion.div
        className="flex min-h-screen flex-col bg-white px-[35px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <main className="flex flex-1 flex-col pt-[111px]">
          <section className="flex flex-col items-center text-center">
            <AIIcon />

            <h1 className="mt-9 text-[22px] font-extrabold leading-tight tracking-[-0.04em] text-[#1F1D2B]">
              AI is building your plan ✨
            </h1>
            <p className="mt-3 max-w-[270px] text-[15px] font-medium leading-5 tracking-[-0.015em] text-[#6B7280]">
              Analyzing your schedule and learning style...
            </p>
          </section>

          <section className="mt-[50px]">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F3F7]">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '65%' }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
            </div>
            <p className="mt-3 text-left text-[14px] font-medium tracking-[-0.015em] text-[#6B7280]">
              65% complete
            </p>
          </section>

          <motion.section
            className="mt-[49px] space-y-[26px]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
            }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.label}
                className="flex items-center gap-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {step.status === 'done' ? <CheckIcon /> : <LoadingIcon />}
                <span
                  className={`text-[16px] tracking-[-0.02em] ${
                    step.status === 'loading'
                      ? 'font-extrabold text-[#1F1D2B]'
                      : 'font-medium text-[#667085]'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.section>

          <div className="mt-[46px] flex h-[52px] items-center gap-3 rounded-xl bg-[#EEF5FF] px-4 text-primary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary text-[13px] font-extrabold leading-none">
              i
            </span>
            <p className="text-[14px] font-semibold tracking-[-0.02em]">
              This usually takes a few seconds
            </p>
          </div>
        </main>

        <div className="mx-auto mb-2 h-1 w-[134px] rounded-full bg-[#202033]/35" />
      </motion.div>
    </MobileContainer>
  );
}

function AIIcon() {
  return (
    <div className="relative flex h-[134px] w-[134px] items-center justify-center">
      <motion.div
        className="absolute h-[132px] w-[132px] rounded-full border-[3px] border-[#DFECFB] bg-[#F8FBFF]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute h-[82px] w-[82px] rounded-full bg-[#D8EAFE]"
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
      />
      <div className="absolute h-[64px] w-[64px] rounded-full bg-[#BBD8F8]" />
      <NetworkIcon />
    </div>
  );
}

function NetworkIcon() {
  return (
    <svg className="relative z-10 h-42px w-42px h-[42px] w-[42px] text-primary" viewBox="0 0 44 44" fill="none">
      <path d="M22 10v10M22 24v10M12 22h8M24 22h8M15 15l6 6M29 15l-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22" cy="9" r="4" fill="currentColor" />
      <circle cx="22" cy="22" r="4" fill="currentColor" />
      <circle cx="22" cy="35" r="4" fill="currentColor" />
      <circle cx="10" cy="22" r="4" fill="currentColor" />
      <circle cx="34" cy="22" r="4" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return <span className="w-5 text-center text-[19px] font-extrabold text-[#22C55E]">✓</span>;
}

function LoadingIcon() {
  return (
    <motion.span
      className="h-5 w-5 rounded-full border-2 border-[#DBEAFE] border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

