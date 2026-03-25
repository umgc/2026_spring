import { renderHook, act } from '@testing-library/react';
import { useNotesEditor } from '../useNotesEditor';
import type { Note } from '../../types';

const note: Note = {
  id: 'note-1',
  title: 'Test Note',
  course: 'SWEN-670',
  date: 'Mar 24, 2026',
  favorite: false,
  tags: ['test'],
  body: 'Initial body',
};

describe('useNotesEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('updates draft immediately and saves after debounce', () => {
    const onSave = jest.fn();
    const { result } = renderHook(() => useNotesEditor({ note, onSave }));

    act(() => {
      result.current.updateDraft('Changed body');
    });

    expect(result.current.draft).toBe('Changed body');
    expect(result.current.saveState).toBe('Saving...');
    expect(onSave).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(240);
    });

    expect(onSave).toHaveBeenCalledWith('note-1', 'Changed body');
    expect(result.current.saveState).toBe('Saved locally');
  });
});
