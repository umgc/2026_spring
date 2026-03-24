import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../state/useAppStore';

type PublicRouteProps = {
  children: ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const { currentUser } = useAuthState();
  const location = useLocation();
  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  if (currentUser) {
    return <Navigate to={destination} replace />;
  }

  return <>{children}</>;
}
