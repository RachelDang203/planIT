import type { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import PageWrapper from '../ui/PageWrapper';
import BottomNav from '../navigation/BottomNav';
import MobileContainer from './MobileContainer';

export type AppLayoutProps = PropsWithChildren;

const HIDDEN_NAV_PATHS = ['/', '/signup', '/login', '/reset'];

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const showBottomNav = !HIDDEN_NAV_PATHS.includes(location.pathname);

  return (
    <MobileContainer>
      <PageWrapper>{children}</PageWrapper>
      {showBottomNav && <BottomNav />}
    </MobileContainer>
  );
}
