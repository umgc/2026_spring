import { Routes, Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsScreen from '../SettingsScreen';
import { renderWithRouter, resetAppStore } from '../../../test/testUtils';

function renderSettings(route = '/settings/appearance') {
  return renderWithRouter(
    <Routes>
      <Route path="/settings/*" element={<SettingsScreen />} />
    </Routes>,
    route,
  );
}

describe('SettingsScreen', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('changes theme mode and toggles accessibility options', async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(screen.getByRole('radio', { name: /dark/i }));
    expect(screen.getByRole('radio', { name: /dark/i })).toHaveAttribute('aria-checked', 'true');

    await user.click(screen.getByRole('link', { name: /accessibility/i }));
    await user.click(screen.getByRole('button', { name: /large text disabled/i }));
    expect(screen.getByRole('button', { name: /large text enabled/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('shows about information', () => {
    renderSettings('/settings/about');
    expect(screen.getByText(/EduLense/i)).toBeInTheDocument();
    expect(screen.getByText(/Offline capable/i)).toBeInTheDocument();
  });
});
