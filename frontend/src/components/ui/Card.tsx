import type { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ children, ...props }: CardProps) {
  return <div {...props}>{children}</div>;
}