import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export type PageWrapperProps = PropsWithChildren<{
  className?: string;
}>;

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <motion.main
      className={`min-h-screen bg-white ${className}`.trim()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      {children}
    </motion.main>
  );
}