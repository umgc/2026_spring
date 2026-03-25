import { Routes, Route } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardScreen from '../DashboardScreen';
import ExploreScreen from '../ExploreScreen';
import ProfileScreen from '../ProfileScreen';
import HelpScreen from '../HelpScreen';
import NotFoundScreen from '../NotFoundScreen';
import { resetAppStore, renderWithRouter } from '../../../test/testUtils';
import useAppStore from '../../state/useAppStore';

describe('additional screen coverage', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('renders dashboard quick actions and course cards', () => {
    renderWithRouter(<DashboardScreen />);

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /new course/i })).toBeInTheDocument();
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
  });

  it('filters and selects recommendations in explore', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ExploreScreen />);

    expect(screen.getByText(/selected course/i)).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText(/search courses or categories/i), 'design');
    expect(screen.getAllByText(/ux accessibility basics/i).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /ux accessibility basics/i }));
    expect(screen.getByRole('button', { name: /save to learning plan/i })).toBeInTheDocument();
  });

  it('shows profile content', () => {
    useAppStore.setState({ currentUser: { name: 'Demo Student', email: 'demo@edulence.app' } });

    renderWithRouter(
      <Routes>
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>,
      '/profile',
    );

    expect(screen.getByText('Demo Student')).toBeInTheDocument();
    expect(screen.getByText(/assignments done/i)).toBeInTheDocument();
  });

  it('shows help content', () => {
    renderWithRouter(
      <Routes>
        <Route path="/help" element={<HelpScreen />} />
      </Routes>,
      '/help',
    );

    expect(screen.getByText(/what is included/i)).toBeInTheDocument();
    expect(screen.getByText(/interactive targets keep a minimum 44px size/i)).toBeInTheDocument();
  });

  it('shows the not found screen', () => {
    renderWithRouter(
      <Routes>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>,
      '/missing-page',
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to dashboard/i })).toBeInTheDocument();
  });
});
