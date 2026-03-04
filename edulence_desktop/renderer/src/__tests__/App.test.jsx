import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

describe('App', () => {
  test('renders authentication screen by default', async () => {
    render(<App />);
    expect(await screen.findByText(/Welcome to EduLense/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('sign in transitions to main desktop UI', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: /Sign In/i }));
   const banners = await screen.findAllByRole('banner');
expect(banners.length).toBeGreaterThan(0);
    expect(screen.getByText('EduLense')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /Main navigation/i })).toBeInTheDocument();
  });

  test('keyboard shortcut Cmd/Ctrl+/ shows shortcuts modal', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByRole('button', { name: /Sign In/i }));

    await user.keyboard('{Control>}/{/Control}');
    expect(await screen.findByRole('dialog', { name: /Keyboard Shortcuts/i })).toBeInTheDocument();
    expect(screen.getByText(/Cmd\/Ctrl\+O/i)).toBeInTheDocument();
  });
});
