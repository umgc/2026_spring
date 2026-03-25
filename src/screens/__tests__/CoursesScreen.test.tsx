import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CoursesScreen from '../CoursesScreen';
import { resetAppStore, renderWithRouter } from '../../../test/testUtils';

describe('CoursesScreen', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('filters courses by search and completed tab', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CoursesScreen />);

    expect(screen.getByText('Advanced Calculus')).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText(/search courses/i), 'biology');
    expect(await screen.findByText('Biology')).toBeInTheDocument();
    expect(screen.queryByText('Advanced Calculus')).not.toBeInTheDocument();

    await user.clear(screen.getByPlaceholderText(/search courses/i));
    await user.click(screen.getByRole('tab', { name: /completed/i }));
    expect(screen.getByText('Biology')).toBeInTheDocument();
    expect(screen.queryByText('Physics II')).not.toBeInTheDocument();
  });

  it('adds a new course from the modal form', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CoursesScreen />);

    await user.click(screen.getByRole('button', { name: /add course/i }));
    await user.type(screen.getByLabelText(/^title$/i), 'Software Testing');
    await user.type(screen.getByLabelText(/^code$/i), 'SWEN-670');
    await user.type(screen.getByLabelText(/^instructor$/i), 'Prof. Adams');
    await user.clear(screen.getByLabelText(/^credits$/i));
    await user.type(screen.getByLabelText(/^credits$/i), '3');
    await user.clear(screen.getByLabelText(/^progress$/i));
    await user.type(screen.getByLabelText(/^progress$/i), '100');
    await user.type(screen.getByLabelText(/^schedule$/i), 'Fri, 7:00 PM');
    await user.type(screen.getByLabelText(/^description$/i), 'Graduate software testing.');
    await user.click(screen.getByRole('button', { name: /save course/i }));

    expect(await screen.findByText('Software Testing')).toBeInTheDocument();
    expect(screen.getAllByText('Completed').length).toBeGreaterThan(0);
    expect(screen.getByText('SWEN-670')).toBeInTheDocument();
  });
});
