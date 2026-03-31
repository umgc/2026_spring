import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotesScreen from '../NotesScreen';
import { resetAppStore, renderWithRouter } from '../../../test/testUtils';

describe('NotesScreen', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('creates a new note and makes it active', async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotesScreen />);

    await user.click(screen.getByRole('button', { name: /new note/i }));
    expect(await screen.findByDisplayValue('Untitled Note')).toBeInTheDocument();
    expect(screen.getByLabelText(/note content/i)).toHaveValue('# Untitled Note\n\nStart writing here...');
  });

  it('searches notes and edits the active note', async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotesScreen />);

    await user.type(screen.getByPlaceholderText(/search notes/i), 'physics');
    expect(await screen.findByText('Physics Lab Notes')).toBeInTheDocument();
    expect(screen.queryByText('Calculus Lecture 15')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /physics lab notes/i }));
    const content = screen.getByLabelText(/note content/i);
    await user.clear(content);
    await user.type(content, 'Updated physics note');

    await waitFor(() => {
      expect(screen.getByText(/saved locally/i)).toBeInTheDocument();
    });
  });
});
