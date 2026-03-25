import { Routes, Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthScreen from '../AuthScreen';
import useAppStore from '../../state/useAppStore';
import { renderWithRouter, resetAppStore } from '../../../test/testUtils';

function renderAuth(route = '/auth/signin') {
  return renderWithRouter(
    <Routes>
      <Route path="/auth/:mode" element={<AuthScreen />} />
      <Route path="/dashboard" element={<div>Dashboard page</div>} />
    </Routes>,
    route,
  );
}

describe('AuthScreen', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('signs in and redirects to the dashboard route', async () => {
    const user = userEvent.setup();
    renderAuth();

    await user.click(screen.getAllByRole('button', { name: /^sign in$/i })[1]);

    await waitFor(() => {
      expect(screen.getByText('Dashboard page')).toBeInTheDocument();
    });
    expect(useAppStore.getState().currentUser?.email).toBe('demo@edulence.app');
  });

  it('shows auth error for invalid credentials', async () => {
    const user = userEvent.setup();
    renderAuth();

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await user.clear(screen.getByLabelText(/password/i));
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getAllByRole('button', { name: /^sign in$/i })[1]);

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password.');
  });
});
