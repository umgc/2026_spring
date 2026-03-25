import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../ErrorBoundary';
import ProtectedRoute from '../ProtectedRoute';
import PublicRoute from '../PublicRoute';
import RouteLoading from '../RouteLoading';
import PageTransition from '../PageTransition';
import { resetAppStore, renderWithRouter } from '../../../test/testUtils';
import useAppStore from '../../state/useAppStore';

function Thrower() {
  throw new Error('Boom');
}

describe('routing helpers and boundary', () => {
  let consoleErrorSpy: ReturnType<typeof jest.spyOn> | undefined;
  beforeEach(() => {
    resetAppStore();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy?.mockRestore();
  });

  it('redirects guests from protected routes', () => {
    renderWithRouter(
      <Routes>
        <Route
          path="/private"
          element={
            <ProtectedRoute>
              <div>Private content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/auth/signin" element={<div>Sign in page</div>} />
      </Routes>,
      '/private',
    );

    expect(screen.getByText('Sign in page')).toBeInTheDocument();
  });

  it('redirects signed-in users away from public auth screens', () => {
    useAppStore.setState({ currentUser: { name: 'Demo Student', email: 'demo@edulence.app' } });

    renderWithRouter(
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <PublicRoute>
              <div>Sign in page</div>
            </PublicRoute>
          }
        />
        <Route path="/dashboard" element={<div>Dashboard page</div>} />
      </Routes>,
      '/auth/signin',
    );

    expect(screen.getByText('Dashboard page')).toBeInTheDocument();
  });

  it('shows the error boundary fallback and resets', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Thrower />
            </ErrorBoundary>
          }
        />
      </Routes>,
      '/',
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Boom');
    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders loading and page transition wrappers', () => {
    const { rerender } = renderWithRouter(
      <Routes>
        <Route path="/dashboard" element={<PageTransition><div>Dashboard page</div></PageTransition>} />
        <Route path="/notes" element={<PageTransition><div>Notes page</div></PageTransition>} />
      </Routes>,
      '/dashboard',
    );

    expect(screen.getByText('Dashboard page')).toBeInTheDocument();
    expect(document.querySelector('.page-transition')).toBeTruthy();

    rerender(<RouteLoading />);
    expect(screen.getByText(/preparing your workspace/i)).toBeInTheDocument();
  });
});
