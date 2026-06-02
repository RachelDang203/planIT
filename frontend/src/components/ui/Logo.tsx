import type { HTMLAttributes } from 'react';

export type LogoProps = HTMLAttributes<HTMLSpanElement>;

export default function Logo(props: LogoProps) {
  return (
    <span aria-label="PlanIT logo" {...props}>
      PlanIT
    </span>
  );
}