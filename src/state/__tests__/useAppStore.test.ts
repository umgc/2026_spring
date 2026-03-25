import useAppStore from '../useAppStore';
import { resetAppStore } from '../../../test/testUtils';

describe('useAppStore', () => {
  beforeEach(() => {
    resetAppStore();
  });

  it('signs in with the demo account', () => {
    const result = useAppStore.getState().signIn('demo@edulence.app', 'demo1234');
    expect(result.success).toBe(true);
    expect(useAppStore.getState().currentUser?.email).toBe('demo@edulence.app');
  });

  it('rejects duplicate sign-up emails', () => {
    const result = useAppStore
      .getState()
      .signUp('Demo Student', 'demo@edulence.app', 'another123');
    expect(result).toEqual({
      success: false,
      message: 'An account with this email already exists.',
    });
    expect(useAppStore.getState().authError).toBe('An account with this email already exists.');
  });

  it('adds a course and marks completed status when progress is 100', () => {
    const startingCount = useAppStore.getState().courses.length;
    useAppStore.getState().addCourse({
      title: 'Software Testing',
      code: 'SWEN-670',
      instructor: 'Prof. Taylor',
      credits: 3,
      progress: 100,
      schedule: 'Fri, 7:00 PM',
      description: 'Graduate testing course.',
    });

    const { courses } = useAppStore.getState();
    expect(courses).toHaveLength(startingCount + 1);
    expect(courses[0]).toMatchObject({ code: 'SWEN-670', status: 'Completed', credits: 3 });
  });

  it('creates and updates notes', () => {
    const startCount = useAppStore.getState().notes.length;
    useAppStore.getState().createNote();

    const { activeNoteId, notes, lastSavedMessage } = useAppStore.getState();
    expect(notes).toHaveLength(startCount + 1);
    expect(activeNoteId).toBe(notes[0].id);
    expect(lastSavedMessage).toBe('Draft created locally');

    useAppStore.getState().updateNoteBody(notes[0].id, 'Updated body');
    expect(useAppStore.getState().notes[0].body).toBe('Updated body');
    expect(useAppStore.getState().lastSavedMessage).toContain('Saved locally');
  });
});
