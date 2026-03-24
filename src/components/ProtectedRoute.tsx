import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from '../state/useAppStore';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useAuthState();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
