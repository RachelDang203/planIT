import type { PropsWithChildren } from 'react';

export type MobileContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className={`mx-auto min-h-screen w-full max-w-mobile bg-white ${className}`.trim()}>
      {children}
    </div>
  );
}